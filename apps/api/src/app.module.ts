import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { HealthController } from './health.controller';
import { LeadsModule } from './modules/leads/leads.module';
import { PrismaModule } from './common/prisma.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TelegramModule } from './modules/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    LeadsModule,
    ProjectsModule,
    TasksModule,
    DocumentsModule,
    AiModule,
    TelegramModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
