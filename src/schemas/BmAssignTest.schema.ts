import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ASSIGNED_STUDENT_STATUS,
  ASSIGNED_TEST_STATUS,
} from '../constant/constant';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class BmAssignedTestSchema {
  @Prop({ required: true })
  testName: string;

  @Prop({ required: true })
  studentName: string;

  @Prop({ type: Date, required: false })
  assignedDate: Date;

  @Prop({ type: Date, required: false })
  dueDate: Date;

  @Prop({
    type: String,
    enum: Object.values(ASSIGNED_TEST_STATUS),
    default: ASSIGNED_TEST_STATUS.UNAPPROVED,
  })
  testApproval: string;

  @Prop({
    type: String,
    enum: Object.values(ASSIGNED_STUDENT_STATUS),
    default: ASSIGNED_STUDENT_STATUS.UNAVAILABLE,
  })
  student_status: string;
}

export type BmAssignedTestDocument = Document & BmAssignedTestSchema;

export const bmAssignedTest_Schema =
  SchemaFactory.createForClass(BmAssignedTestSchema);

export const BMASSIGNEDTEST_MODEL = BmAssignedTestSchema.name;
