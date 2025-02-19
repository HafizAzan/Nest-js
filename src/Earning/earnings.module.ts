import { Module } from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { EARNINGS_MODEL, earnings_Schema } from 'src/schemas/Earnings.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EarningsController } from './earnings.controller';
import {
  DashBoardSchemas,
  SchemaDashboard,
} from 'src/schemas/dashboard.schema';
import {
  StudentsSchema,
  studentsSchema,
} from 'src/Schemas/student-management.schema';
import {
  batchManagementSchema,
  BatchSchema,
  SearchData,
  SearchTermSchema,
} from 'src/Schemas/batch-management.schema';
import { EXPENSES_MODEL, expenses_Schema } from 'src/schemas/expenses.schema';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { studentService } from 'src/student-management/student.service';
import { BatchService } from 'src/batch-management/batch.service';
import { ExpensesService } from 'src/ExpensesModules/Expenses.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EARNINGS_MODEL, schema: earnings_Schema },
      { name: DashBoardSchemas.name, schema: SchemaDashboard },
      { name: StudentsSchema.name, schema: studentsSchema },
      { name: BatchSchema.name, schema: batchManagementSchema },
      { name: EXPENSES_MODEL, schema: expenses_Schema },
      { name: SearchData.name, schema: SearchTermSchema },
    ]),
  ],
  controllers: [EarningsController],
  providers: [
    EarningsService,
    DashboardService,
    studentService,
    BatchService,
    ExpensesService,
  ],
  exports: [EarningsService],
})
export class EarningsModule {}
