import { Module } from '@nestjs/common';
import { GivingNoteService } from './giving-note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Giving_MODEL, Giving_Schema } from 'src/schemas/Giving.Schema';
import { GivingNoteController } from './giving-note.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Giving_MODEL, schema: Giving_Schema }]),
  ],
  controllers: [GivingNoteController],
  providers: [GivingNoteService],
  exports: [GivingNoteService, MongooseModule],
})
export class GivingNoteModule {}
