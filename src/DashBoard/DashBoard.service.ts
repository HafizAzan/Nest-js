import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { StudentsSchema } from 'src/Schemas/student-mangement.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DashBoardSchemas } from 'src/Schemas/DashBoard.schema';
import { EXPENSES_MODEL, ExpensesDocument } from 'src/schemas/expenses.schema';
import { SearchData } from 'src/Schemas/batch-management.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(StudentsSchema.name)
    private studentModel: Model<StudentsSchema>,

    @InjectModel(SearchData.name) private SearchModel: Model<SearchData>,

    @InjectModel(DashBoardSchemas.name)
    private DashboardModel: Model<DashBoardSchemas>,
  ) {}
  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return this.studentModel.find({ monthlyFees: 0 }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
