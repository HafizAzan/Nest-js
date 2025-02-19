import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EARNINGS_STATUS } from 'src/constant/constant';

@Schema({
  timestamps: true,
})
export class EarningsSchema {
  @Prop({ required: true })
  studentName: string;

  @Prop()
  transactionId: number;

  @Prop({ required: false })
  amount: number;

  @Prop()
  description: string;

  @Prop()
  date: string;

  @Prop()
  screenShot: string;

  @Prop({
    type: String,
    enum: Object.values(EARNINGS_STATUS),
    default: EARNINGS_STATUS.PAID,
  })
  status?: string;
}

export const earnings_Schema = SchemaFactory.createForClass(EarningsSchema);

export type EarningsDocument = Document & EarningsSchema;

export const EARNINGS_MODEL = EarningsSchema.name;
