import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/prisma.service';
import { CreateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  list(organizationId: string) {
    return this.prisma.task.findMany({
      where: { organizationId },
      include: { project: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        organizationId: dto.organizationId,
        projectId: dto.projectId,
        title: dto.title,
        description: dto.description,
        assigneeName: dto.assigneeName,
        deadline: dto.deadline ? new Date(dto.deadline) : null,
        status: 'TODO',
      },
    });
  }
}
