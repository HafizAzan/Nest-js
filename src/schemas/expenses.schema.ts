import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ExpensesSchema {
  @Prop()
  expenseTitle: string;

  @Prop()
  recurring: string;

  @Prop()
  duration: string;

  @Prop()
  ammount: number;

  @Prop()
  imageFileName: string;

  @Prop()
  description: string;
}

export type ExpensesDocument = Document & ExpensesSchema;

export const expenses_Schema = SchemaFactory.createForClass(ExpensesSchema);

export const EXPENSES_MODEL = ExpensesSchema.name;
