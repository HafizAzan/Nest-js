import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createBatchDTO,
  updateAll,
  updateOneBatch,
} from 'src/DTOs/batch.post.dto';
import { BatchSchema, SearchData } from 'src/Schemas/batch-management.schema';
import { StudentsSchema } from 'src/Schemas/student-management.schema';

@Injectable()
export class BatchService {
  constructor(
    @InjectModel(BatchSchema.name) private BatchModel: Model<BatchSchema>,
    @InjectModel(SearchData.name) private SearchDataModel: Model<SearchData>,
    @InjectModel(StudentsSchema.name)
    private StudentModel: Model<StudentsSchema>,
  ) {}

  async calculateTotalIncome(): Promise<{
    totalIncome: number;
  }> {
    const batches = await this.BatchModel.find().exec();
    let totalIncome = 0;

    batches.forEach((batch) => {
      totalIncome += batch.totalIncome;
    });

    return { totalIncome };
  }

  async findAllWithPagination(
    page: number,
    size: number,
  ): Promise<{
    updatedBatches: any[];
    TotalBatch: number;
  }> {
    try {
      const skip = (page - 1) * size;
      const batches = await this.BatchModel.find()
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(size)
        .populate('posts')
        .exec();

      const TotalBatch = await this.BatchModel.countDocuments().exec();

      const updatedBatches = await Promise.all(
        batches.map(async (batch) => {
          const totalIncome = batch.posts.reduce(
            (total, student) => total + student.monthlyFees,
            0,
          );

          await this.BatchModel.findByIdAndUpdate(batch._id, {
            totalIncome,
          });

          return {
            ...batch.toObject(),
            totalIncome,
          };
        }),
      );

      return { updatedBatches, TotalBatch };
    } catch (error) {
      throw new Error(`Error retrieving batches: ${error.message}`);
    }
  }

  async totalBatch() {
    const TotalBatch = await this.BatchModel.countDocuments().exec();
    return TotalBatch;
  }

  async create(createBatchDTO: createBatchDTO) {
    try {
      const batch = await this.BatchModel.create(createBatchDTO);
      return batch;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new ServiceUnavailableException();
    }
  }

  async findOne(id: string) {
    const batch = await this.BatchModel.findById(id).populate('posts');
    if (!batch) {
      throw new NotFoundException('Batch Not Found!');
    }
    return batch;
  }

  async getBatchIncome() {
    const batches = (
      await this.BatchModel.find().populate('totalIncome')
    ).toString();

    const income = batches + batches;

    return income;
  }

  async updateAll(id: string, updateBatchDTO: updateAll) {
    const updatedBatch = await this.BatchModel.findByIdAndUpdate(
      id,
      updateBatchDTO,
      { new: true },
    );
    if (!updatedBatch) {
      throw new NotFoundException('Batch Not Found!');
    }
    return updatedBatch;
  }

  async updateOne(id: string, updateOneUserDTO: updateOneBatch) {
    const updatedBatch = await this.BatchModel.findByIdAndUpdate(
      id,
      updateOneUserDTO,
      { new: true },
    ).sort({ updatedAt: -1 });
    if (!updatedBatch) {
      throw new NotFoundException('Batch Not Found!');
    }
    return updatedBatch;
  }

  async remove(id: string) {
    const removedBatch = await this.BatchModel.findByIdAndDelete(id).sort({
      updatedAt: -1,
    });
    if (!removedBatch) {
      throw new NotFoundException('Batch not found');
    }
    return {
      _id: id,
    };
  }

  async getOngoing(id: string): Promise<any> {
    const Ongoing = await this.BatchModel.findById(id).exec();
    if (!Ongoing) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    Ongoing.status = 'ONGOING';
    await Ongoing.save();
    return { status: Ongoing.status };
  }

  async getOutgoing(id: string): Promise<any> {
    const Ongoing = await this.BatchModel.findById(id).exec();
    if (!Ongoing) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    Ongoing.status = 'OUTGOING';
    await Ongoing.save();
    return { status: Ongoing.status };
  }

  async findBatchById(batchId: string): Promise<BatchSchema> {
    return this.BatchModel.findById(batchId).populate('posts').exec();
  }

  async findOneDetail(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Batch ID!');
    }
    const batch = await this.BatchModel.findById(id).exec();
    if (!batch) {
      throw new NotFoundException('Batch Not Found!');
    }
    return batch?.batchName;
  }

  async removeStudentFromBatch(batchId: string, studentId: string) {
    await this.BatchModel.findByIdAndUpdate(batchId, {
      $pull: { posts: studentId },
      $set: { updatedAt: new Date() },
    });
  }

  async addStudentToBatch(batchId: string, studentId: string): Promise<void> {
    const batch = await this.BatchModel.findByIdAndUpdate(batchId, {
      $push: { posts: studentId },
      $set: { updatedAt: new Date() },
    });

    if (!batch) {
      throw new NotFoundException(`Batch with ID ${batchId} not found`);
    }
  }

  async removeFromOldBatch(
    studentId: string,
    oldBatchId: string,
  ): Promise<void> {
    await this.BatchModel.findByIdAndUpdate(oldBatchId, {
      $pull: { posts: studentId },
      $set: { updatedAt: new Date() },
    });
  }

  async getLockupBatch() {
    const batches = await this.BatchModel.find().exec();
    if (batches.length > 0) {
      return batches.map((batch) => ({
        batchName: batch.batchName,
        batchid: batch._id,
      }));
    } else {
      return [];
    }
  }

  async searchBatches(query: string) {
    let searchCriteria: any = {};

    if (/^\//.test(query)) {
      // It's a regex query
      const regex = new RegExp(query.slice(1, -1), 'i');
      searchCriteria = {
        $or: [
          { batchName: regex },
          { githubLink: regex },
          { description: regex },
        ],
      };
    } else {
      searchCriteria = {
        $or: [
          { batchName: new RegExp(query, 'i') },
          { githubLink: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') },
        ],
      };
    }

    return this.BatchModel.find(searchCriteria).exec();
  }

  async getSortedPosts(batchId: string, page: number, size: number) {
    const skip = (page - 1) * size;
    const batch = await this.BatchModel.findById(batchId)
      .populate('posts')
      .skip(skip)
      .limit(size)
      .sort({ updatedAt: -1 })
      .exec();
    if (!batch) {
      throw new Error('Batch not found');
    }
    const studentDetail = batch.posts
      .slice()
      .sort((a, b) => b.studentName.localeCompare(a.studentName));

    const totalMonthlyFees = batch.posts.reduce((total, post) => {
      return total + (post.monthlyFees || 0);
    }, 0);

    return { studentDetail, totalMonthlyFees };
  }

  async searchStudentInBatches(query: string, batchId: string) {
    try {
      const objectId = Types.ObjectId.isValid(batchId)
        ? new Types.ObjectId(batchId)
        : null;

      if (!objectId) {
        throw new Error('Invalid batch ID format');
      }

      const batch = await this.BatchModel.findOne({ _id: objectId }).populate(
        'posts',
      );

      if (!batch) {
        throw new Error('Batch not found');
      }

      console.log('Batch found:', batch);

      let regex;
      if (/^\//.test(query)) {
        regex = new RegExp(query.slice(1, -1), 'i');
      } else {
        regex = new RegExp(query, 'i');
      }

      console.log('Search regex:', regex);

      const filteredPosts = batch.posts.filter((post) => {
        console.log('Checking post:', post);
        return (
          (post.studentName && regex.test(post.studentName)) ||
          (post.repoLink && regex.test(post.repoLink)) ||
          (post.studentBio && regex.test(post.studentBio)) ||
          (post.email && regex.test(post.email))
        );
      });

      return filteredPosts;
    } catch (error) {
      console.error('Error in searchStudentInBatches:', error);
      throw new Error('Internal server error');
    }
  }
}
