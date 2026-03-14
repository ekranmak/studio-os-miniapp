import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzeLeadDto, EstimateProjectDto, GenerateTzDto } from './dto';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze-lead')
  analyzeLead(@Body() dto: AnalyzeLeadDto) {
    return this.aiService.analyzeLead(dto);
  }

  @Post('generate-tz')
  generateTz(@Body() dto: GenerateTzDto) {
    return this.aiService.generateTechnicalSpecification(dto);
  }

  @Post('estimate-project')
  estimateProject(@Body() dto: EstimateProjectDto) {
    return this.aiService.estimateProject(dto);
  }

  @Post('generate-tasks')
  generateTasks(@Body() dto: GenerateTzDto) {
    return this.aiService.generateProjectPlan(dto);
  }
}
