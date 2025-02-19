import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EXPENSES_MODEL,
  ExpensesDocument,
  ExpensesSchema,
} from 'src/schemas/expenses.schema';
import { updateExpenseDTO } from '../DTOs/update.DTO';
import { updateExpenseOneDTO } from '../DTOs/update.One.DTO';
import { CreateExpenseDTO } from '../DTOs/Expenses.DTO';
import * as fs from 'fs';
import * as path from 'path';
import { DashBoardSchemas } from 'src/Schemas/DashBoard.schema';
import { StudentsSchema } from 'src/Schemas/student-mangement.schema';
import { BatchSchema, SearchData } from 'src/Schemas/batch-management.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(EXPENSES_MODEL)
    private readonly expensesModel: Model<ExpensesDocument>,

    @InjectModel(SearchData.name)
    private readonly SearchModel: Model<SearchData>,

    @InjectModel(DashBoardSchemas.name)
    private DashboardModel: Model<DashBoardSchemas>,

    @InjectModel(StudentsSchema.name)
    private studentModel: Model<StudentsSchema>,
    @InjectModel(BatchSchema.name) private batchModel: Model<BatchSchema>,
  ) {}

  async createExpense(createExpenseDTO: CreateExpenseDTO) {
    try {
      const expense = await this.expensesModel.create(createExpenseDTO);
      return expense;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new ServiceUnavailableException();
    }
  }

  async TotalExpenses(): Promise<{ totalAmount: number; totalItems: any }> {
    const [expenses, totalCount] = await Promise.all([
      this.expensesModel.find().exec(),
      this.expensesModel.countDocuments().exec(),
    ]);

    let totalAmount = 0;
    expenses.forEach((expense) => {
      totalAmount += expense.ammount;
    });

    return {
      totalAmount: totalAmount,
      totalItems: totalCount,
    };
  }

  async findAll(): Promise<{
    data: ExpensesSchema[];
    totalAmount: number;
    totalItems: any;
  }> {
    try {
      const [expenses, totalCount] = await Promise.all([
        this.expensesModel.find().exec(),
        this.expensesModel.countDocuments().exec(),
      ]);

      let totalAmount = 0;
      expenses.forEach((expense) => {
        totalAmount += expense.ammount;
      });

      return {
        data: expenses,
        totalAmount: totalAmount,
        totalItems: totalCount,
      };
    } catch (error) {
      throw new Error(`Error retrieving expenses: ${error.message}`);
    }
  }
  async findAllPag(
    page: number,
    size: number,
  ): Promise<{
    data: ExpensesSchema[];
    totalAmount: number;
    totalItems: any;
  }> {
    try {
      const skip = (page - 1) * size;
      const [expenses, totalCount] = await Promise.all([
        this.expensesModel.find().skip(skip).limit(size).exec(),
        this.expensesModel.countDocuments().exec(),
      ]);

      let totalAmount = 0;
      expenses.forEach((expense) => {
        totalAmount += expense.ammount;
      });

      return {
        data: expenses,
        totalAmount: totalAmount,
        totalItems: totalCount,
      };
    } catch (error) {
      throw new Error(`Error retrieving expenses: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const expense = await this.expensesModel.findById(id);
    if (!expense) {
      throw new NotFoundException('Expense Not Found!');
    }
    return expense;
  }

  async updateAll(
    id: string,
    updateExpenseDTO: updateExpenseDTO,
    file?: Express.Multer.File,
  ) {
    if (file) {
      updateExpenseDTO.imageFileName = file.filename;
    }

    const updatedExpense = await this.expensesModel.findByIdAndUpdate(
      id,
      updateExpenseDTO,
      { new: true },
    );
    if (!updatedExpense) {
      throw new NotFoundException('Expense Not Found!');
    }
    return updatedExpense;
  }

  async updateOne(id: string, updateOneUserDTO: updateExpenseOneDTO) {
    const updatedExpense = await this.expensesModel.findByIdAndUpdate(
      id,
      updateOneUserDTO,
      { new: true },
    );
    if (!updatedExpense) {
      throw new NotFoundException('Expense Not Found!');
    }
    return updatedExpense;
  }

  async remove(id: string) {
    const removedExpense = await this.expensesModel.findByIdAndDelete(id);
    if (!removedExpense) {
      throw new NotFoundException('Expense not found');
    }

    if (removedExpense.imageFileName) {
      const filePath = path.join(
        __dirname,
        '../../uploads/',
        removedExpense.imageFileName,
      );
      try {
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        } else {
          console.warn(`File not found: ${filePath}`);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        throw new ServiceUnavailableException('Error deleting image');
      }
    }

    return {
      _id: id,
    };
  }

  async getUpdatedAmount(): Promise<number> {
    try {
      const expenses = await this.expensesModel.find().exec();
      let totalAmount = 0;

      expenses.forEach((expense) => {
        totalAmount += expense.ammount;
      });

      return totalAmount;
    } catch (error) {
      throw new Error(`Error calculating total amount: ${error.message}`);
    }
  }

  async SearchExpense(query: string) {
    const regex = /^\//.test(query)
      ? new RegExp(query.slice(1, -1), 'i')
      : new RegExp(query, 'i');

    const searchCriteria = {
      $or: [
        { expenseTitle: regex },
        { recurring: regex },
        { duration: regex },
        { description: regex },
      ],
    };

    return this.expensesModel.find(searchCriteria).exec();
  }
}
