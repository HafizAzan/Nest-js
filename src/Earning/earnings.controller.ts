import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { CreateEarningDto } from '../DTOs/create-earning.dto';
import { UpdateEarningDto } from '../DTOs/update-earning.dto';
import { UpdateOneEarningDto } from '../DTOs/updateOne-earning.dto';

@Controller('/earnings')
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) {}

  @Post()
  create(@Body() createEarningDto: CreateEarningDto) {
    return this.earningsService.create(createEarningDto);
  }
  @Post('search')
  async SearchEarning(@Body('query') query: string) {
    const SearchEarning = await this.earningsService.SearchEarning(query);
    return { query, earning: SearchEarning };
  }

  @Get()
  findAll() {
    return this.earningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.earningsService.findOne(id);
  }

  @Get('/total-earning')
  findEarning() {
    return this.earningsService.findEarning();
  }

  @Put(':id')
  UpdateAll(
    @Param('id') id: string,
    @Body() updateEarningDto: UpdateEarningDto,
  ) {
    return this.earningsService.updateAll(id, updateEarningDto);
  }

  @Patch(':id')
  UpdateOne(
    @Param('id') id: string,
    @Body() updateOneEarningDto: UpdateOneEarningDto,
  ) {
    return this.earningsService.updateOne(id, updateOneEarningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.earningsService.remove(id);
  }
}
