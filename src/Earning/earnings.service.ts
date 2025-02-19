import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateEarningDto } from '../DTOs/create-earning.dto';
import { UpdateEarningDto } from '../DTOs/update-earning.dto';
import { EARNINGS_MODEL, EarningsDocument } from 'src/schemas/Earnings.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateOneEarningDto } from '../DTOs/updateOne-earning.dto';
import { Model } from 'mongoose';
import { query } from 'express';
import { DashBoardSchemas } from 'src/Schemas/DashBoard.schema';
import { EXPENSES_MODEL, ExpensesDocument } from 'src/schemas/expenses.schema';
import { StudentsSchema } from 'src/Schemas/student-mangement.schema';
import { BatchSchema, SearchData } from 'src/Schemas/batch-management.schema';

@Injectable()
export class EarningsService {
  constructor(
    @InjectModel(EARNINGS_MODEL)
    private readonly earningsModel: Model<EarningsDocument>,
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

  async create(CreateEarningDto: CreateEarningDto) {
    try {
      const earning = await this.earningsModel.create(CreateEarningDto);
      return earning;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new ServiceUnavailableException();
    }
  }

  async SearchEarning(query: string) {
    const regex = /^\//.test(query)
      ? new RegExp(query.slice(1, -1), 'i')
      : new RegExp(query, 'i');

    const searchCriteria = {
      $or: [{ studentName: regex }, { status: regex }, { description: regex }],
    };

    return this.earningsModel.find(searchCriteria).exec();
  }

  async totalAmountEarning() {
    const earnings = await this.earningsModel.find();
    const totalAmount = earnings.reduce(
      (total, amount) => total + amount.amount,
      0,
    );

    return { totalAmount };
  }

  async findAll() {
    const earnings = await this.earningsModel.find();
    const totalAmount = earnings.reduce(
      (total, amount) => total + amount.amount,
      0,
    );

    return { earnings, totalAmount };
  }

  async findOne(id: string) {
    const earning = await this.earningsModel.findById(id);
    if (!earning) {
      throw new NotFoundException('Earning Not Found!');
    }
    return earning;
  }
  async findEarning(): Promise<{ totalAmount: number }> {
    const earnings = await this.earningsModel.find().exec();
    const totalAmount = earnings.reduce(
      (sum, earning) => sum + earning.amount,
      0,
    );

    return { totalAmount };
  }

  async updateAll(id: string, UpdateEarningDto: UpdateEarningDto) {
    const updatedEarning = await this.earningsModel.findByIdAndUpdate(
      id,
      UpdateEarningDto,
      { new: true },
    );
    if (!updatedEarning) {
      throw new NotFoundException('Earning Not Found!');
    }
    return updatedEarning;
  }

  async updateOne(id: string, UpdateOneEarningDto: UpdateOneEarningDto) {
    const updatedOneEarning = await this.earningsModel.findByIdAndUpdate(
      id,
      UpdateOneEarningDto,
      { new: true },
    );
    if (!updatedOneEarning) {
      throw new NotFoundException('Earning Not Found!');
    }
    return updatedOneEarning;
  }

  async remove(id: string) {
    const removedEarning = await this.earningsModel.findByIdAndDelete(id);
    if (!removedEarning) {
      throw new NotFoundException('Earning not found');
    }
    return {
      _id: id,
    };
  }
}
