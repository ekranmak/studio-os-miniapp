import { IsEnum, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export enum DocumentKind {
  CONTRACT = 'CONTRACT',
  ACT = 'ACT',
  INVOICE = 'INVOICE',
  TECH_SPEC = 'TECH_SPEC',
}

export class GenerateDocumentDto {
  @IsUUID()
  organizationId!: string;

  @IsUUID()
  @IsOptional()
  projectId?: string;

  @IsEnum(DocumentKind)
  kind!: DocumentKind;

  @IsString()
  title!: string;

  @IsObject()
  variables!: Record<string, string | number>;
}
