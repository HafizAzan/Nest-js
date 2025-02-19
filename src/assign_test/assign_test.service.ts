import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { query } from 'express';
import {
  BMASSIGNEDTEST_MODEL,
  BmAssignedTestDocument,
} from 'src/Schemas/BmAssignTest.schema';
import {
  CreateBmAssignedTestDto,
  UpdateBmAssignedTestDto,
  UpdateOneBmAssignedTestDto,
} from 'src/DTOs/create-assign_test.dto';

@Injectable()
export class BmAssignedTestsService {
  constructor(
    @InjectModel(BMASSIGNEDTEST_MODEL)
    private readonly bmAssignedTestModel: Model<BmAssignedTestDocument>,
  ) {}

  async findAllWithPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const AssignedTests = await this.bmAssignedTestModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const totalCount = await this.bmAssignedTestModel
      .countDocuments(query)
      .exec();
    return {
      items: AssignedTests,
      totalItems: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async create(createBmAssignedTest: CreateBmAssignedTestDto) {
    try {
      const createAssignedTest =
        await this.bmAssignedTestModel.create(createBmAssignedTest);
      return createAssignedTest;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    const findAssignedTests = await this.bmAssignedTestModel.find();
    return findAssignedTests;
  }

  async findOne(id: string) {
    const findOneAssignedTest = await this.bmAssignedTestModel.findById(id);
    if (!findOneAssignedTest) {
      throw new NotFoundException('AssignedTest Not Found!');
    }
    return findOneAssignedTest;
  }

  async updateAll(id: string, updateBmAssignedTest: UpdateBmAssignedTestDto) {
    const updateAllAssignedTest =
      await this.bmAssignedTestModel.findByIdAndUpdate(
        id,
        updateBmAssignedTest,
        { new: true },
      );
    if (!updateAllAssignedTest) {
      throw new NotFoundException('AssignedTest Not Found!');
    }
    return updateAllAssignedTest;
  }

  async updateOne(
    id: string,
    updateOneBmAssignedTest: UpdateOneBmAssignedTestDto,
  ) {
    const updateAssignedTest = await this.bmAssignedTestModel.findByIdAndUpdate(
      id,
      updateOneBmAssignedTest,
      { new: true },
    );
    if (!updateAssignedTest) {
      throw new NotFoundException('AssignedTest Not Found!');
    }
    return updateAssignedTest;
  }

  async remove(id: string) {
    const removedAssignedTest =
      await this.bmAssignedTestModel.findByIdAndDelete(id);
    if (!removedAssignedTest) {
      throw new NotFoundException('AssignedTest not found');
    }
    return {
      _id: id,
    };
  }
}
