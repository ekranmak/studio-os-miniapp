import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { AnalyzeLeadDto, EstimateProjectDto, GenerateTzDto } from './dto';

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  async analyzeLead(dto: AnalyzeLeadDto) {
    const response = {
      projectType: dto.summary.toLowerCase().includes('crm') ? 'CRM + Website' : 'Corporate website',
      complexity: dto.summary.length > 120 ? 'high' : 'medium',
      budgetRange: dto.budgetHint ? `${dto.budgetHint} - ${dto.budgetHint * 1.4}` : '350000 - 900000',
      recommendedAgents: ['Lead Intelligence Agent', 'Finance & Estimation Agent'],
    };

    await this.prisma.aiRequest.create({
      data: {
        organizationId: dto.organizationId,
        type: 'ANALYZE_LEAD',
        payload: JSON.stringify(dto),
        result: JSON.stringify(response),
      },
    });

    return response;
  }

  async generateTechnicalSpecification(dto: GenerateTzDto) {
    const sections = [
      '1. Цели проекта',
      '2. Пользовательские сценарии',
      '3. Информационная архитектура',
      '4. Интеграции и CRM модули',
      '5. SEO и аналитика',
      '6. Этапы production и acceptance criteria',
    ];

    const response = {
      title: `Техническое задание для проекта ${dto.projectId}`,
      pagesEstimate: 14,
      sections,
      content: `${dto.brief}\n\n${sections.join('\n')}`,
    };

    await this.prisma.aiRequest.create({
      data: {
        organizationId: dto.organizationId,
        projectId: dto.projectId,
        type: 'GENERATE_TZ',
        payload: JSON.stringify(dto),
        result: JSON.stringify(response),
      },
    });

    return response;
  }

  async generateProjectPlan(dto: GenerateTzDto) {
    return {
      projectId: dto.projectId,
      tasks: [
        'Discovery & research',
        'Wireframes and UX',
        'Visual design system',
        'Frontend development',
        'Backend integrations',
        'QA and launch',
      ],
    };
  }

  async estimateProject(dto: EstimateProjectDto) {
    return {
      estimatedBudget: dto.budget ?? 780000,
      deliveryWeeks: 8,
      team: ['PM', 'Designer', 'Frontend', 'Backend', 'QA'],
      assumptions: ['1 Telegram Mini App', '1 CRM dashboard', '1 document workflow'],
    };
  }
}
