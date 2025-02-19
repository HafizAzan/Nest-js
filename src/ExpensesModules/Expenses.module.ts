import { Module } from '@nestjs/common';
import { Expenses } from './Expenses.controller';
import { ExpensesService } from './Expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EXPENSES_MODEL, expenses_Schema } from 'src/schemas/expenses.schema';
import {
  DashBoardSchemas,
  SchemaDashboard,
} from 'src/Schemas/DashBoard.schema';
import { DashboardService } from 'src/dashboard/dashboard.service';
import {
  StudentsSchema,
  studentsSchema,
} from 'src/Schemas/student-mangement.schema';
import {
  batchManagementSchema,
  BatchSchema,
  SearchData,
  SearchTermSchema,
} from 'src/Schemas/batch-management.schema';
import { studentService } from 'src/student-management/student.service';
import { BatchService } from 'src/batch-management/batch.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EXPENSES_MODEL, schema: expenses_Schema },
      { name: DashBoardSchemas.name, schema: SchemaDashboard },
      { name: StudentsSchema.name, schema: studentsSchema },
      { name: BatchSchema.name, schema: batchManagementSchema },
      { name: SearchData.name, schema: SearchTermSchema },
    ]),
  ],
  controllers: [Expenses],
  providers: [ExpensesService, DashboardService, studentService, BatchService],
  exports: [ExpensesService],
})
export class ExpensesModulesModule {}
