import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GivingDocument, Giving_MODEL } from 'src/schemas/Giving.Schema';

@Injectable()
export class UploadBookService {
  constructor(
    @InjectModel(Giving_MODEL)
    private readonly GIVINGMODEL: Model<GivingDocument>,
  ) {}
}
