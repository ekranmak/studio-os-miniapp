import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/prisma.service';
import { AiService } from '../ai/ai.service';
import { TelegramService } from '../telegram/telegram.service';
import { ConvertLeadDto, CreateLeadDto } from './dto';

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly telegramService: TelegramService,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        organizationId: dto.organizationId,
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
        source: dto.source,
        status: 'NEW',
      },
    });

    const analysis = await this.aiService.analyzeLead({
      organizationId: dto.organizationId,
      leadId: lead.id,
      summary: dto.message ?? '',
      budgetHint: null,
    });

    await this.telegramService.sendText(
      `Новая заявка: ${lead.name}\nИсточник: ${lead.source ?? 'unknown'}\nAI: ${analysis.projectType}`,
    );

    return { lead, analysis };
  }

  async convert(dto: ConvertLeadDto) {
    const lead = await this.prisma.lead.findFirstOrThrow({
      where: {
        id: dto.leadId,
        organizationId: dto.organizationId,
      },
    });

    const client = await this.prisma.client.create({
      data: {
        organizationId: dto.organizationId,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
      },
    });

    const project = await this.prisma.project.create({
      data: {
        organizationId: dto.organizationId,
        clientId: client.id,
        name: `${lead.name} project`,
        stage: 'NEGOTIATION',
      },
    });

    await this.prisma.lead.update({
      where: { id: lead.id },
      data: { status: 'CONVERTED', clientId: client.id },
    });

    return { client, project };
  }
}
