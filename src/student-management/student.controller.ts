import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createStudentsDTO, updateAll, updateOne } from 'src/DTOs/student.dto';
import { diskStorage } from 'multer';
import { studentService } from './student.service';
import { StudentsSchema } from 'src/Schemas/student-management.schema';

@Controller('students-management')
export class studentManagement {
  constructor(private studentsService: studentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads';
          console.log(`Saving file to ${uploadPath}`); // Logging statement
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${file.originalname}`;
          console.log(`Generated filename: ${uniqueSuffix}`); // Logging statement
          cb(null, uniqueSuffix);
        },
      }),
      fileFilter: (req, file, cb) => {
        console.log(`File type: ${file.mimetype}`); // Logging statement
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Unsupported file type'), false);
        }
      },
    }),
  )
  async create(
    @Body() createStudentsDTO: createStudentsDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createStudentsDTO.image = file.filename;
    } else {
      console.log('No file uploaded'); // Logging statement
    }

    try {
      return await this.studentsService.create(createStudentsDTO);
    } catch (error) {
      console.error('Error creating student:', error); // Logging statement
      throw error;
    }
  }

  @Get()
  async findAllWithPagination(
    @Query('page') page: number = 1,
    size: number = 10,
  ) {
    const students = await this.studentsService.findAllWithPagination(
      page,
      size,
    );
    return students;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentsService.findOne(id);
  }

  @Get('/total-count')
  async getTotalStudents() {
    return await this.studentsService.getTotalStudents();
  }

  @Put(':id')
  UpdateAll(@Param('id') id: string, @Body() updateAll: updateAll) {
    return this.studentsService.updateAll(id, updateAll);
  }

  @Patch(':id')
  async updateStudent(
    @Param('id') studentId: string,
    @Body() updateOne: updateOne,
  ) {
    const updatedStudent = await this.studentsService.updateStudent(
      studentId,
      updateOne,
    );

    return updatedStudent;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  @Get('/student-details/:id')
  findOneDetail(@Param('id') id: string): Promise<string> {
    return this.studentsService.findOneDetail(id);
  }

  @Post('search')
  async SearchStudents(@Body('query') query: string) {
    const SearchStudent = await this.studentsService.SearchStudents(query);
    return { query, students: SearchStudent };
  }
}
