import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ExpensesCardsSchema {
  @Prop()
  totalIncomeThisMonth: string;

  @Prop()
  totalExpensesThisMonth: string;

  @Prop()
  profitThisMonth: string;
}

export const expenses_Cards_Schema =
  SchemaFactory.createForClass(ExpensesCardsSchema);

export type ExpensesCardsDocument = Document & ExpensesCardsSchema;

export const EXPENSES_CARDS_MODEL = ExpensesCardsSchema.name;
