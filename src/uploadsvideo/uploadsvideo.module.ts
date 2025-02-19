import { Module } from '@nestjs/common';
import { UploadsvideoController } from './uploadsvideo.controller';
import { UploadsvideoService } from './uploadsvideo.service';

@Module({
  controllers: [UploadsvideoController],
  providers: [UploadsvideoService]
})
export class UploadsvideoModule {}
