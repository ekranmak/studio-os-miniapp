import { Body, Controller, Post } from '@nestjs/common';
import { GenerateDocumentDto } from './dto';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('contract')
  generateContract(@Body() dto: GenerateDocumentDto) {
    return this.documentsService.generate(dto);
  }
}
