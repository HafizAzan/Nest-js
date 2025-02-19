import { Module } from '@nestjs/common';
import { UploadBookController } from './upload-book.controller';
import { UploadBookService } from './upload-book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Giving_MODEL, Giving_Schema } from 'src/schemas/Giving.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Giving_MODEL, schema: Giving_Schema }]),
  ],
  controllers: [UploadBookController],
  providers: [UploadBookService, MongooseModule],
})
export class UploadBookModule {}
