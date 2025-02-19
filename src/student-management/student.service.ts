import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { updateOneBatch } from 'src/DTOs/batch.post.dto';
import { createStudentsDTO, updateAll, updateOne } from 'src/DTOs/student.dto';
import { BatchSchema, SearchData } from 'src/Schemas/batch-management.schema';
import { DashBoardSchemas } from 'src/Schemas/DashBoard.schema';
import { StudentsSchema } from 'src/Schemas/student-mangement.schema';

@Injectable()
export class studentService {
  constructor(
    @InjectModel(StudentsSchema.name)
    private studentModel: Model<StudentsSchema>,
    @InjectModel(BatchSchema.name) private batchModel: Model<BatchSchema>,
    @InjectModel(SearchData.name) private SearchModel: Model<SearchData>,
    @InjectModel(DashBoardSchemas.name)
    private DashboardModel: Model<DashBoardSchemas>,
  ) {}

  async create(createStudentDto: createStudentsDTO): Promise<StudentsSchema> {
    const { batchId, monthlyFees, ...studentData } = createStudentDto;
    console.log('Received student creation request with data:', studentData);

    const findBatch = await this.batchModel.findById(batchId);
    if (!findBatch) {
      console.error(`Batch with ID ${batchId} not found`);
      throw new HttpException(
        `Batch with ID ${batchId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const createdStudent = new this.studentModel({
      ...studentData,
      monthlyFees,
    });
    const savedStudent = await createdStudent.save();
    console.log('Student saved:', savedStudent);

    await this.batchModel.findByIdAndUpdate(batchId, {
      $push: { posts: savedStudent._id },
    });
    if (monthlyFees === 0) {
      const dashboard = await this.DashboardModel.findOneAndUpdate(
        {},
        {
          $push: { Students: savedStudent._id },
        },
        { new: true },
      ).exec();
      console.log('Added to dashboard:', dashboard);
    } else {
      await this.DashboardModel.updateOne(
        { Students: savedStudent._id },
        { $pull: { Students: savedStudent._id } },
      ).exec();

      await this.studentModel
        .findByIdAndUpdate(savedStudent._id, {
          $push: { Students: savedStudent._id },
        })
        .exec();
      console.log('Added to student management');
    }
    return savedStudent;
  }

  async findAllWithPagination(page: number, size: number) {
    const skip = (page - 1) * size;
    const studentsPromise = this.studentModel
      .find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(size)
      .populate('batch')
      .exec();
    const totalStudentsPromise = this.studentModel.countDocuments().exec();

    const [students, totalStudents] = await Promise.all([
      studentsPromise,
      totalStudentsPromise,
    ]);

    if (!students) {
      throw new NotFoundException('Students not found');
    }

    return { students, totalStudents };
  }

  async TotalStudents() {
    const totalStudentsPromise = this.studentModel.countDocuments().exec();
    return totalStudentsPromise;
  }

  async findOne(id: string) {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async getTotalStudents() {
    return await this.studentModel.countDocuments().exec();
  }

  async updateAll(id: string, studentsUpdateDTO: updateAll) {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, studentsUpdateDTO, { new: true })
      .sort({ updatedAt: -1 });
    if (!updatedStudent) {
      throw new NotFoundException('Student Not Found!');
    }
    return updatedStudent;
  }

  async remove(id: string) {
    const removedStudent = await this.studentModel.findByIdAndDelete(id);
    if (!removedStudent) {
      throw new NotFoundException('Student not found');
    }
    return {
      _id: id,
    };
  }

  async findStudentsByBatch(batchId: string): Promise<StudentsSchema[]> {
    const studentBatchById = await this.studentModel
      .find({
        'batch._id': batchId,
      })
      .exec();

    if (!studentBatchById) {
      throw new BadRequestException('not Found');
    }
    return studentBatchById;
  }

  async getBatchTotalIncome(batchId: string): Promise<any> {
    const batch = await this.batchModel.findById(batchId);

    if (!batch) {
      throw new NotFoundException('Batch not found');
    }

    const students = await this.studentModel
      .find({
        'batches.batchId': batchId,
      })
      .exec();

    const totalIncome = students.reduce(
      (total, student) => total + student.monthlyFees,
      0,
    );

    return totalIncome;
  }

  async studentremove(batchId: string, studentId: string): Promise<any> {
    try {
      const student = await this.studentModel.findByIdAndDelete({
        _id: studentId,
        'batch._id': batchId,
      });

      if (!student) {
        throw new NotFoundException('Student not found');
      }
      await this.updateBatchRemoveStudent(batchId, studentId);
      return { message: 'Student removed successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async updateBatchRemoveStudent(
    batchId: string,
    studentId: string,
  ): Promise<void> {
    await this.batchModel
      .findByIdAndUpdate(batchId, {
        $pull: { posts: studentId },
      })
      .exec();
  }

  async updateStudent(studentId: string, updateData: updateOne) {
    try {
      const { batchId, ...restData } = updateData;

      // Find the current student document
      let updatedStudent = await this.studentModel
        .findById(studentId)
        .sort({ updatedAt: -1 });

      // If student is not found, throw an error
      if (!updatedStudent) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      // If batchId exists and is different from the current batchId
      if (batchId && batchId !== updatedStudent.batches.batchId) {
        // Find the current batch of the student
        const currentBatchId = updatedStudent.batches.batchId;
        const currentBatch = await this.batchModel
          .findById(currentBatchId)
          .sort({ updatedAt: -1 });

        // Remove the student from the current batch's posts array
        if (currentBatch) {
          await this.batchModel
            .findByIdAndUpdate(currentBatchId, {
              $pull: { posts: studentId },
            })
            .sort({ updatedAt: -1 });
        }

        updatedStudent.batches = {
          ...updatedStudent.batches,
          batchId,
        };

        // Save the updated student
        updatedStudent = await updatedStudent.save();

        // Update the new batch with the student's ID in posts array
        await this.batchModel
          .findByIdAndUpdate(batchId, {
            $push: { posts: studentId },
          })
          .sort({ updatedAt: -1 });
      }

      // Update the rest of the student's data
      updatedStudent.set(restData);
      updatedStudent = await updatedStudent.save();

      return updatedStudent;
    } catch (error) {
      console.error('Error updating student:', error);
      throw new HttpException(
        'Failed to update student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStudentWithOutBatch(): Promise<StudentsSchema[]> {
    const batch = await this.batchModel.find().exec();
    const assignedStudentIds = batch.reduce((acc, batch) => {
      return acc.concat(batch.posts.map((studentId) => studentId.toString()));
    }, []);
    if (!batch) {
      return [];
    }

    const allStudents = await this.studentModel.find().exec();

    const studentsNotInBatch = allStudents.filter(
      (student) => !assignedStudentIds.includes(student._id.toString()),
    );

    return studentsNotInBatch;
  }

  async AddStudentsToBatch(batchId: string, studentId: string) {
    try {
      // Batch update kar rahe hain
      const updatedBatch = await this.batchModel.findByIdAndUpdate(
        batchId,
        { $push: { posts: studentId } },
        { new: true },
      );

      if (!updatedBatch) {
        throw new Error('Batch not found');
      }
      await this.studentModel.updateMany(
        { _id: { $in: studentId } },
        {
          batches: {
            batchName: updatedBatch.batchName,
            batchId: updatedBatch._id,
          },
        },
      );

      return updatedBatch;
    } catch (error) {
      console.error('Error updating batch with students:', error);
      throw error;
    }
  }

  async findOneDetail(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Batch ID!');
    }
    const Student = await this.studentModel.findById(id).exec();
    if (!Student) {
      throw new NotFoundException('Student Not Found!');
    }
    return Student?.studentName;
  }

  async SearchStudents(query: string) {
    let searchCriteria: any = {};

    if (/^\//.test(query)) {
      // It's a regex query
      const regex = new RegExp(query.slice(1, -1), 'i');
      searchCriteria = {
        $or: [
          { studentName: regex },
          { repoLink: regex },
          { studentBio: regex },
          { email: regex },
          { location: regex },
          { birthday: regex },
        ],
      };
    } else {
      searchCriteria = {
        $or: [
          { studentName: new RegExp(query, 'i') },
          { repoLink: new RegExp(query, 'i') },
          { studentBio: new RegExp(query, 'i') },
          { email: new RegExp(query, 'i') },
          { location: new RegExp(query, 'i') },
          { birthday: new RegExp(query, 'i') },
        ],
      };
    }

    return this.studentModel.find(searchCriteria).exec();
  }
}
