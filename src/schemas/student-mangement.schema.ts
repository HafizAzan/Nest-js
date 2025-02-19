import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { studentSchemaSec, studentSec } from 'src/DTOs/student.sec.dto';
import { BatchSchema } from './batch-management.schema';
import { TEST_SUBMISION } from 'src/constant/constant';

@Schema({
  timestamps: true,
})
export class StudentsSchema {
  @Prop({ required: true })
  studentName: string;

  @Prop()
  studentId: string;

  @Prop({
    required: false,
    type: {
      batchName: { type: String, required: false },
      batchId: { type: String, required: false },
    },
  })
  batches: { batchName: string; batchId: string };

  @Prop({ type: Date, default: Date.now })
  joiningDate: Date;

  @Prop()
  phoneNumber: number;

  @Prop()
  advanceFee: number;

  @Prop()
  repoLink: string;

  @Prop()
  admissionFees: number;

  @Prop()
  monthlyFees: number;

  @Prop()
  studentBio: string;

  @Prop()
  email: string;

  @Prop()
  birthday: string;

  @Prop()
  location: string;

  @Prop()
  image: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BatchSchema' }],
  })
  batch: BatchSchema[];

  @Prop({
    type: String,
    enum: Object.values(TEST_SUBMISION),
    default: TEST_SUBMISION.NOTSUBMITED,
  })
  test_submision?: string;
}

export const studentsSchema = SchemaFactory.createForClass(StudentsSchema);
