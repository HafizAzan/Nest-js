import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateExpenseOneDTO {
  @IsString()
  @IsOptional()
  expenseTitle?: string;

  @IsString()
  @IsOptional()
  recurring?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsNumber()
  @IsOptional()
  ammount?: number;

  @IsOptional()
  @IsString()
  imageFileName?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
