import { Module } from '@nestjs/common';
import { ApiSrService } from './api-sr/api-sr.service';
import { ApiFxService } from './api-fx/api-fx.service';
import { ApiGdService } from './api-gd/api-gd.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ApiSrService, ApiFxService, ApiGdService],
  exports: [ApiSrService, ApiFxService, ApiGdService],
})
export class ExternalApiModule {}
