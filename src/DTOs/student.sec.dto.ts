import { SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty } from 'class-validator';

export class studentSec {
  @IsString()
  @IsNotEmpty()
  batchName: string;

  @IsString()
  @IsNotEmpty()
  batchId: string;
}
export const studentSchemaSec = SchemaFactory.createForClass(studentSec);
