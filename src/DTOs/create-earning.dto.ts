import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EARNINGS_STATUS } from 'src/constant/constant';

export class CreateEarningDto {
  @IsString()
  @IsNotEmpty()
  studentName?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsEnum(EARNINGS_STATUS)
  @IsNotEmpty()
  @IsString({ each: true })
  status?: EARNINGS_STATUS;

  @IsNumber()
  @IsNotEmpty()
  transactionId?: number;

  @IsNumber()
  @IsNotEmpty()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsOptional()
  screenShot?: string;
}
