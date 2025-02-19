import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  batchManagementSchema,
  BatchSchema,
  SearchData,
  SearchTermSchema,
} from 'src/Schemas/batch-management.schema';
import {
  StudentsSchema,
  studentsSchema,
} from 'src/Schemas/student-mangement.schema';
import { studentManagement } from './student.controller';
import { studentService } from './student.service';
import { BatchService } from 'src/batch-management/batch.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
import {
  DashBoardSchemas,
  SchemaDashboard,
} from 'src/Schemas/DashBoard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BatchSchema.name, schema: batchManagementSchema },
      { name: StudentsSchema.name, schema: studentsSchema },
      { name: DashBoardSchemas.name, schema: SchemaDashboard },
      { name: SearchData.name, schema: SearchTermSchema },
    ]),
  ],
  controllers: [studentManagement],
  providers: [studentService, BatchService, DashboardService],
  exports: [studentService],
})
export class studentManagementModule {}
