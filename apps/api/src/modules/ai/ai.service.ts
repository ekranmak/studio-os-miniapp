import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { AnalyzeLeadDto, EstimateProjectDto, GenerateTzDto } from './dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly xaiUrl = 'https://api.x.ai/v1/chat/completions';
  private readonly model = process.env.XAI_MODEL ?? 'grok-3-mini';

  constructor(private readonly prisma: PrismaService) {}

  private async callXAI(systemPrompt: string, userMessage: string): Promise<string> {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      this.logger.warn('XAI_API_KEY not set — returning mock response');
      return 'AI ответ недоступен: не настроен XAI_API_KEY';
    }

    const response = await fetch(this.xaiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Groq API error: ${error}`);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json() as any;
    return data.choices[0].message.content as string;
  }

  async analyzeLead(dto: AnalyzeLeadDto) {
    const systemPrompt = `Ты — AI-аналитик веб-студии. Анализируй заявки от потенциальных клиентов.
Отвечай ТОЛЬКО в формате JSON без markdown, строго по схеме:
{"projectType":"...","complexity":"low|medium|high","budgetRange":"...","recommendedAgents":["..."],"summary":"..."}`;

    const userMessage = `Заявка клиента: ${dto.summary}${dto.budgetHint ? `\nБюджет: ${dto.budgetHint} руб.` : ''}`;

    let result: any;
    try {
      const text = await this.callXAI(systemPrompt, userMessage);
      result = JSON.parse(text);
    } catch {
      result = {
        projectType: dto.summary.toLowerCase().includes('crm') ? 'CRM + Сайт' : 'Корпоративный сайт',
        complexity: dto.summary.length > 120 ? 'high' : 'medium',
        budgetRange: dto.budgetHint ? `${dto.budgetHint} - ${Math.round(dto.budgetHint * 1.4)}` : '350 000 - 900 000 ₽',
        recommendedAgents: ['Lead Intelligence Agent', 'Finance Agent'],
        summary: 'Анализ выполнен в автономном режиме',
      };
    }

    await this.prisma.aiRequest.create({
      data: {
        organizationId: dto.organizationId,
        type: 'ANALYZE_LEAD',
        payload: JSON.stringify(dto),
        result: JSON.stringify(result),
      },
    });

    return result;
  }

  async generateTechnicalSpecification(dto: GenerateTzDto) {
    const systemPrompt = `Ты — технический директор веб-студии. Пишешь профессиональные технические задания на русском языке.
Отвечай ТОЛЬКО в формате JSON без markdown:
{"title":"...","pagesEstimate":14,"sections":["..."],"content":"полный текст ТЗ"}`;

    const userMessage = `Бриф проекта:\n${dto.brief}`;

    let result: any;
    try {
      const text = await this.callXAI(systemPrompt, userMessage);
      result = JSON.parse(text);
    } catch {
      const sections = [
        '1. Цели проекта',
        '2. Пользовательские сценарии',
        '3. Информационная архитектура',
        '4. Интеграции',
        '5. SEO и аналитика',
        '6. Этапы и критерии приёмки',
      ];
      result = {
        title: `Техническое задание — проект ${dto.projectId}`,
        pagesEstimate: 14,
        sections,
        content: `${dto.brief}\n\n${sections.join('\n')}`,
      };
    }

    await this.prisma.aiRequest.create({
      data: {
        organizationId: dto.organizationId,
        projectId: dto.projectId,
        type: 'GENERATE_TZ',
        payload: JSON.stringify(dto),
        result: JSON.stringify(result),
      },
    });

    return result;
  }

  async generateProjectPlan(dto: GenerateTzDto) {
    const systemPrompt = `Ты — project manager веб-студии. Составляешь план задач для проекта.
Отвечай ТОЛЬКО в формате JSON: {"projectId":"...","tasks":["..."]}`;

    const userMessage = `Бриф: ${dto.brief}`;

    try {
      const text = await this.callXAI(systemPrompt, userMessage);
      return JSON.parse(text);
    } catch {
      return {
        projectId: dto.projectId,
        tasks: [
          'Discovery & research',
          'Wireframes и UX',
          'Визуальная дизайн-система',
          'Frontend разработка',
          'Backend и интеграции',
          'QA и запуск',
        ],
      };
    }
  }

  async estimateProject(dto: EstimateProjectDto) {
    const systemPrompt = `Ты — финансовый аналитик веб-студии. Оцениваешь стоимость и сроки проектов.
Отвечай ТОЛЬКО в формате JSON: {"estimatedBudget":0,"deliveryWeeks":0,"team":["..."],"assumptions":["..."]}`;

    const userMessage = `Описание: ${dto.scope}${dto.budget ? `\nПланируемый бюджет: ${dto.budget} руб.` : ''}`;

    try {
      const text = await this.callXAI(systemPrompt, userMessage);
      return JSON.parse(text);
    } catch {
      return {
        estimatedBudget: dto.budget ?? 780000,
        deliveryWeeks: 8,
        team: ['PM', 'Дизайнер', 'Frontend', 'Backend', 'QA'],
        assumptions: ['1 Telegram Mini App', '1 CRM дашборд', '1 документооборот'],
      };
    }
  }
}
