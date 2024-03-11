import { Global, Module } from '@nestjs/common';
import { BitacoraLogsService } from './bitacora-logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { mongodbConfig } from '../../config/mongo.config';
import { BitacoraLog, BitacoraLogSchema } from './model/bitacoraLog.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        mongodbConfig(configService),
    }),
    MongooseModule.forFeature([
      { name: BitacoraLog.name, schema: BitacoraLogSchema },
    ]),
  ],
  providers: [BitacoraLogsService],
  exports: [BitacoraLogsService],
})
export class BitacoraLogsModule {}
