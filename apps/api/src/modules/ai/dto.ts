import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AnalyzeLeadDto {
  @IsUUID()
  organizationId!: string;

  @IsUUID()
  @IsOptional()
  leadId?: string;

  @IsString()
  summary!: string;

  @IsOptional()
  budgetHint?: number | null;
}

export class GenerateTzDto {
  @IsUUID()
  organizationId!: string;

  @IsUUID()
  projectId!: string;

  @IsString()
  brief!: string;
}

export class EstimateProjectDto {
  @IsUUID()
  organizationId!: string;

  @IsString()
  scope!: string;

  @IsOptional()
  @IsNumber()
  budget?: number;
}
