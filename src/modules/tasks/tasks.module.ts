import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GenerateFilesService } from './generate-files/generate-files.service';
import { ExternalApiModule } from '../external-api/external-api.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [ExternalApiModule, MailModule],
  providers: [TasksService, GenerateFilesService],
})
export class TasksModule {}
