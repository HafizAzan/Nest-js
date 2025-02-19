import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DashBoardSchemas,
  SchemaDashboard,
} from 'src/schemas/dashboard.schema';
import { studentManagementModule } from 'src/student-management/student.module';
import { studentService } from 'src/student-management/student.service';
import {
  StudentsSchema,
  studentsSchema,
} from 'src/Schemas/student-management.schema';
import { BatchService } from 'src/batch-management/batch.service';
import {
  batchManagementSchema,
  BatchSchema,
  SearchData,
  SearchTermSchema,
} from 'src/Schemas/batch-management.schema';
import { ExpensesService } from 'src/ExpensesModules/Expenses.service';
import { EXPENSES_MODEL, expenses_Schema } from 'src/schemas/expenses.schema';
import { EARNINGS_MODEL, earnings_Schema } from 'src/schemas/Earnings.schema';
import { EarningsService } from 'src/Earning/earnings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DashBoardSchemas.name, schema: SchemaDashboard },
      { name: StudentsSchema.name, schema: studentsSchema },
      { name: BatchSchema.name, schema: batchManagementSchema },
      { name: EXPENSES_MODEL, schema: expenses_Schema },
      { name: EARNINGS_MODEL, schema: earnings_Schema },
      { name: SearchData.name, schema: SearchTermSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    studentService,
    BatchService,
    ExpensesService,
    EarningsService,
  ],
  exports: [DashboardService],
})
export class DashboardModule {}
