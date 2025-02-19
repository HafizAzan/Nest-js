import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';
import { BATCH_STATUS } from '../constant/constant';

export class createBatchDTO {
  @IsString()
  @IsNotEmpty()
  batchName?: string;

  @IsString()
  @IsNotEmpty()
  githubLink?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsEnum(BATCH_STATUS)
  @IsOptional()
  @IsString({ each: true })
  status?: BATCH_STATUS;

  @IsNumber()
  @IsOptional()
  totalStudents?: number;

  @IsDate()
  @IsOptional()
  dateCreated?: Date;

  @IsNumber()
  @IsOptional()
  totalIncome?: number;
}

export class updateAll {
  @IsString()
  @IsNotEmpty()
  batchName?: string;

  @IsString()
  @IsNotEmpty()
  githubLink?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsEnum(BATCH_STATUS)
  @IsOptional()
  @IsString({ each: true })
  status?: BATCH_STATUS;

  @IsNumber()
  @IsOptional()
  totalStudents?: number;

  @IsDate()
  @IsOptional()
  dateCreated?: Date;

  @IsNumber()
  @IsOptional()
  totalIncome?: number;
}

export class updateOneBatch {
  @IsString()
  @IsNotEmpty()
  batchName?: string;

  @IsString()
  @IsNotEmpty()
  githubLink?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsEnum(BATCH_STATUS)
  @IsOptional()
  @IsString({ each: true })
  status?: BATCH_STATUS;

  @IsNumber()
  @IsOptional()
  totalStudents?: number;

  @IsDate()
  @IsOptional()
  dateCreated?: Date;

  @IsNumber()
  @IsOptional()
  totalIncome?: number;
}
