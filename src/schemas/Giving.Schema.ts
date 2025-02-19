import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  _id: true,
})
export class GivingSchema {
  @Prop({ type: String, required: true })
  fileName: any;
}

export const Giving_Schema = SchemaFactory.createForClass(GivingSchema);

export type GivingDocument = Document & GivingSchema;

export const Giving_MODEL = GivingSchema.name;
