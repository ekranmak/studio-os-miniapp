import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/prisma.service';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  list(organizationId: string) {
    return this.prisma.project.findMany({
      where: { organizationId },
      include: { client: true, tasks: true, documents: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        organizationId: dto.organizationId,
        clientId: dto.clientId,
        name: dto.name,
        price: dto.price,
        deadline: dto.deadline ? new Date(dto.deadline) : null,
        stage: 'LEAD',
      },
    });
  }
}
