import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateExpenseDTO {
  @IsString()
  @IsNotEmpty()
  expenseTitle: string;

  @IsString()
  @IsNotEmpty()
  recurring: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  ammount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  imageFileName?: string;
}
