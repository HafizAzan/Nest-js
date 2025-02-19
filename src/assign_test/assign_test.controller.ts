import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { BmAssignedTestsService } from './assign_test.service';
import {
  CreateBmAssignedTestDto,
  UpdateBmAssignedTestDto,
  UpdateOneBmAssignedTestDto,
} from 'src/DTOs/create-assign_test.dto';

@Controller('/assigned-tests')
export class BmAssignedTestsController {
  constructor(
    private readonly bmAssignedTestsService: BmAssignedTestsService,
  ) {}

  @Post()
  create(@Body() createBmAssignedTest: CreateBmAssignedTestDto) {
    return this.bmAssignedTestsService.create(createBmAssignedTest);
  }

  // @Get()
  // findAllWithPagination(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10,
  // ) {
  //   return this.bmAssignedTestsService.findAllWithPagination(page, limit);
  // }

  @Get()
  findAll() {
    return this.bmAssignedTestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bmAssignedTestsService.findOne(id);
  }

  @Put(':id')
  UpdateAll(
    @Param('id') id: string,
    @Body() updateBmAssignedTest: UpdateBmAssignedTestDto,
  ) {
    return this.bmAssignedTestsService.updateAll(id, updateBmAssignedTest);
  }

  @Patch(':id')
  UpdateOne(
    @Param('id') id: string,
    @Body() updateOneBmAssignedTest: UpdateOneBmAssignedTestDto,
  ) {
    return this.bmAssignedTestsService.updateOne(id, updateOneBmAssignedTest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bmAssignedTestsService.remove(id);
  }
}
