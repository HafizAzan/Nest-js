import { Module } from '@nestjs/common';
import { downloadFileController } from './Download.controller';

@Module({
  controllers: [downloadFileController],
  providers: [],
})
export class DownloadModule {}
