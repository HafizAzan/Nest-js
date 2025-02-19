import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class signup {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  confirm_password: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;
}

export const signSchema = SchemaFactory.createForClass(signup);
