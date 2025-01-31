import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (configService: ConfigService) => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: false,
    options: { encrypt: false },
  } as TypeOrmModuleOptions;
};
