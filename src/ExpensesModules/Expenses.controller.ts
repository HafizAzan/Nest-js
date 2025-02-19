import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExpensesService } from './Expenses.service';
import { updateExpenseDTO } from '../DTOs/update.DTO';
import { updateExpenseOneDTO } from '../DTOs/update.One.DTO';
import { CreateExpenseDTO } from '../DTOs/Expenses.DTO';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ExpensesSchema } from 'src/schemas/expenses.schema';
@Controller('/expenses')
export class Expenses {
  constructor(private readonly expensesService: ExpensesService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('imageFileName', {
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
  async createExpense(
    @Body() CreateExpenseDTO: CreateExpenseDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      CreateExpenseDTO.imageFileName = file.filename;
    } else {
      console.log('No file uploaded'); // Logging statement
    }

    try {
      return await this.expensesService.createExpense(CreateExpenseDTO);
    } catch (error) {
      console.error('Error creating student:', error); // Logging statement
      throw error;
    }
  }

  @Get('page')
  findAll() {
    return this.expensesService.findAll();
  }

  @Get()
  findAllPag(@Query('page') page: number = 1, size: number = 10) {
    return this.expensesService.findAllPag(page, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  UpdateAll(@Param('id') id: string, @Body() updateUserDTO: updateExpenseDTO) {
    return this.expensesService.updateAll(id, updateUserDTO);
  }

  @Patch(':id')
  UpdateOne(
    @Param('id') id: string,
    @Body() updateOneUserDTO: updateExpenseOneDTO,
  ) {
    return this.expensesService.updateOne(id, updateOneUserDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }

  @Get('/total-ammount')
  async getAmountIncome() {
    return await this.expensesService.getUpdatedAmount();
  }

  @Post('search')
  async SearchExpense(@Body('query') query: string) {
    const SearchExpense = await this.expensesService.SearchExpense(query);
    return { query, expense: SearchExpense };
  }
}
