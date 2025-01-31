import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExternalApiModule } from './modules/external-api/external-api.module';
import { MailModule } from './modules/mail/mail.module';
import { BitacoraLogsModule } from './modules/bitacora-logs/bitacora-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        databaseConfig(configService),
    }),
    // ScheduleModule.forRoot(),
    AuthenticationModule,
    // TasksModule,
    // ExternalApiModule,
    // MailModule,
    // BitacoraLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
