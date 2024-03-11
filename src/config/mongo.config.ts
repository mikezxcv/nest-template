import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const mongodbConfig = (configService: ConfigService) => {
  const dbUser = configService.get('MONGO_USERNAME');
  const dbPassword = configService.get('MONGO_PASSWORD');
  const dbHost = configService.get('MONGO_HOST');
  const dbPort = configService.get('MONGO_PORT');
  const dbName = configService.get('MONGO_DATABASE');

  const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/`;
  return { uri, dbName } as MongooseModuleFactoryOptions;
};
