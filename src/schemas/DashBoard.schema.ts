import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StudentsSchema } from './student-management.schema';
import mongoose from 'mongoose';
import { BatchSchema } from './batch-management.schema';

@Schema()
export class DashBoardSchemas {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentsSchema' }],
  })
  Students: StudentsSchema[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BatchSchema' }],
  })
  Batch: BatchSchema[];
}

export const SchemaDashboard = SchemaFactory.createForClass(DashBoardSchemas);
