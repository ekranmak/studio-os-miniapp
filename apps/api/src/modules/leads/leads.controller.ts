import { Body, Controller, Post } from '@nestjs/common';
import { ConvertLeadDto, CreateLeadDto } from './dto';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Post('convert')
  convert(@Body() dto: ConvertLeadDto) {
    return this.leadsService.convert(dto);
  }
}
