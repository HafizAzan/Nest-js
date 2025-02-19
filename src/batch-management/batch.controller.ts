import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BatchService } from './batch.service';
import {
  createBatchDTO,
  updateAll,
  updateOneBatch,
} from 'src/DTOs/batch.post.dto';
import { studentService } from 'src/student-management/student.service';
import { StudentsSchema } from 'src/Schemas/student-management.schema';
import { BatchSchema } from 'src/Schemas/batch-management.schema';
import { Types } from 'mongoose';
import { updateOne } from 'src/DTOs/student.dto';

@Controller('batch-management')
export class batchManagement {
  constructor(
    private batchService: BatchService,
    private studentsService: studentService,
  ) {}

  @Get()
  async findAllWithPagination(
    @Query('page')
    page: number = 1,
    size: number = 10,
  ) {
    const response = await this.batchService.findAllWithPagination(page, size);
    return { response };
  }

  @Post()
  async create(@Body() createBatchDTO: createBatchDTO) {
    return await this.batchService.create(createBatchDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batchService.findOne(id);
  }

  @Get('ongoing/:id')
  getOngoing(@Param('id') id: string) {
    return this.batchService.getOngoing(id);
  }

  @Get('outgoing/:id')
  getOutgoing(@Param('id') id: string) {
    return this.batchService.getOutgoing(id);
  }

  @Put(':id')
  UpdateAll(@Param('id') id: string, @Body() updateUserDTO: updateAll) {
    return this.batchService.updateAll(id, updateUserDTO);
  }

  @Patch(':id')
  UpdateOne(@Param('id') id: string, @Body() updateOneUserDTO: updateOneBatch) {
    return this.batchService.updateOne(id, updateOneUserDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchService.remove(id);
  }

  @Get('student/:batchId')
  async findBatchById(@Param('batchId') batchId: string): Promise<BatchSchema> {
    const batch = await this.batchService.findBatchById(batchId);
    if (!batch) {
      throw new HttpException('Batch not found', HttpStatus.NOT_FOUND);
    }
    return batch;
  }

  @Get('/details/:id')
  findOneDetail(@Param('id') id: string): Promise<string> {
    return this.batchService.findOneDetail(id);
  }

  @Get('/student/:batchId/totlIncome')
  async getBatchTotalIncome(@Param('batchId') batchId: string) {
    try {
      const totalIncome =
        await this.studentsService.getBatchTotalIncome(batchId);
      return { totalIncome };
    } catch (error) {
      throw new NotFoundException('Batch not found');
    }
  }

  @Get('total-income-batch')
  async getBatchIncome() {
    return this.batchService.getBatchIncome();
  }

  @Delete('/student/:batchId/:studentId')
  async studentremove(
    @Param('batchId') batchId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.studentsService.studentremove(batchId, studentId);
  }

  @Get('/batch/students')
  async getStudentWithOutBatch() {
    return await this.studentsService.getStudentWithOutBatch();
  }

  @Get('/batch/lockup')
  async getLockupBatch() {
    const lockup = await this.batchService.getLockupBatch();
    return lockup;
  }

  @Patch('add-students/:studentId/:batchId/')
  async addStudentsToBatch(
    @Param('batchId') batchId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.studentsService.AddStudentsToBatch(batchId, studentId);
  }

  @Post('search')
  async searchBatches(@Body('query') query: string) {
    const result = await this.batchService.searchBatches(query);
    return { query, batches: result };
  }

  @Get('students-detail/:id')
  async getSortedPosts(
    @Param('id') batchId: string,
    @Query('page') page: number = 1,
    size: number = 10,
  ) {
    return await this.batchService.getSortedPosts(batchId, page, size);
  }

  @Post('students-detail/:batchId/search')
  async searchStudentInBatches(
    @Param('batchId') batchId: string,
    @Body('query') query: string,
  ) {
    const result = await this.batchService.searchStudentInBatches(
      query,
      batchId,
    );
    return { query, studentsInBatch: result };
  }
}
