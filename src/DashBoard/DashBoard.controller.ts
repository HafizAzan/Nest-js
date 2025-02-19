import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { studentService } from 'src/student-management/student.service';
import { BatchService } from 'src/batch-management/batch.service';
import { ExpensesService } from 'src/ExpensesModules/Expenses.service';
import { EarningsService } from 'src/Earning/earnings.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly StudenService: studentService,
    private readonly batchService: BatchService,
    private readonly expensesService: ExpensesService,
    private readonly EarningService: EarningsService,
  ) {}

  @Get()
  async findAll() {
    const student = await this.dashboardService.findAll();
    return { student };
  }

  @Get('/total-income-batch')
  async getTotalIncome() {
    return await this.batchService.calculateTotalIncome();
  }

  @Get('/total-batch')
  async totalBatch() {
    const totalBatch = await this.batchService.totalBatch();
    return { totalBatch };
  }

  @Get('/total-students')
  async TotalStudents() {
    const studentTotal = await this.StudenService.TotalStudents();
    return { studentTotal };
  }

  @Get('/total-expenses-amount')
  async TotalExpenses() {
    const studentTotal = await this.expensesService.TotalExpenses();
    return studentTotal;
  }

  @Get('/total-earning-amount')
  async totalAmountEarning() {
    const studentTotal = await this.EarningService.totalAmountEarning();
    return studentTotal;
  }
}
