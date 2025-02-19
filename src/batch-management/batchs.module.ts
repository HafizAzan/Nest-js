import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  batchManagementSchema,
  BatchSchema,
  SearchData,
  SearchTermSchema,
} from 'src/Schemas/batch-management.schema';
import { batchManagement } from './batch.controller';
import { BatchService } from './batch.service';
import {
  studentsSchema,
  StudentsSchema,
} from 'src/Schemas/student-management.schema';
import { studentService } from 'src/student-management/student.service';
import {
  DashBoardSchemas,
  SchemaDashboard,
} from 'src/schemas/dashboard.schema';
import { DashboardService } from 'src/dashboard/dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BatchSchema.name, schema: batchManagementSchema },
      { name: StudentsSchema.name, schema: studentsSchema },
      { name: DashBoardSchemas.name, schema: SchemaDashboard },
      { name: SearchData.name, schema: SearchTermSchema },
    ]),
  ],
  controllers: [batchManagement],
  providers: [BatchService, studentService, DashboardService],
  exports: [BatchService, MongooseModule],
})
export class batchManagementModule {}
