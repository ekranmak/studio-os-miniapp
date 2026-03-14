import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { DocumentKind, GenerateDocumentDto } from './dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(dto: GenerateDocumentDto) {
    const markdownContent = this.buildTemplate(dto.kind, dto.variables);

    const document = await this.prisma.document.create({
      data: {
        organizationId: dto.organizationId,
        projectId: dto.projectId,
        kind: dto.kind,
        title: dto.title,
        format: 'DOCX_PDF',
        status: 'READY',
        content: markdownContent,
      },
    });

    return {
      document,
      files: {
        docx: `/documents/${document.id}.docx`,
        pdf: `/documents/${document.id}.pdf`,
      },
    };
  }

  private buildTemplate(kind: DocumentKind | string, variables: Record<string, string | number>): string {
    const value = (name: string, fallback: string) => String(variables[name] ?? fallback);

    if (kind === DocumentKind.CONTRACT) {
      return [
        `ДОГОВОР № ${value('contract_number', '0001')}`,
        `Дата: ${value('date', new Date().toLocaleDateString('ru-RU'))}`,
        `Заказчик: ${value('client_name', 'Клиент')}`,
        `Проект: ${value('project_name', 'Проект')}`,
        `Стоимость: ${value('price', '0')} RUB`,
        `Срок: ${value('deadline', 'по согласованию')}`,
        'Основание: ст. 702, 703, 720, 779 ГК РФ.',
      ].join('\n');
    }

    return Object.entries(variables)
      .map(([key, item]) => `${key}: ${String(item)}`)
      .join('\n');
  }
}
