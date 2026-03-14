import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  list(@Query('organizationId') organizationId: string) {
    return this.projectsService.list(organizationId);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }
}
