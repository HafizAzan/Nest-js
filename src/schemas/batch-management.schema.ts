import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BATCH_STATUS } from '../constant/constant';
import mongoose, { Document } from 'mongoose';
import { StudentsSchema } from './student-management.schema';

@Schema({
  timestamps: true,
})
export class BatchSchema extends Document {
  @Prop({ required: true })
  batchName: string;

  @Prop({ required: true })
  githubLink: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  totalStudents: number;

  @Prop({ type: Date, default: Date.now })
  dateCreated: Date;

  @Prop({ default: 0 })
  totalIncome: number;

  @Prop({
    type: String,
    enum: Object.values(BATCH_STATUS),
    default: BATCH_STATUS.ONGOING,
  })
  status?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentsSchema' }],
  })
  posts: StudentsSchema[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentsSchema' }])
  students: StudentsSchema[];
}

export const batchManagementSchema = SchemaFactory.createForClass(BatchSchema);
export class SearchData extends Document {
  @Prop()
  search: string;
}

export const SearchTermSchema = SchemaFactory.createForClass(SearchData);
