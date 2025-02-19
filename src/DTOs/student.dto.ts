import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { studentSec } from './student.sec.dto';
import { TEST_SUBMISION } from 'src/constant/constant';
import { Optional } from '@nestjs/common';

class batchObject {
  @IsString()
  batchName: string;

  @IsString()
  batchId: string;
}

export class createStudentsDTO {
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @ValidateNested()
  @Type(() => batchObject)
  @Optional()
  batches: batchObject;

  @IsString()
  @IsOptional()
  repoLink?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  studentBio?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  birthday?: string;

  @IsString()
  @IsOptional()
  joiningDate?: string;

  @IsNumber()
  @Type(() => Number)
  phoneNumber: number;

  @IsNumber()
  @Type(() => Number)
  advanceFee: number;

  @IsNumber()
  @Type(() => Number)
  admissionFees: number;

  @IsNumber()
  @Type(() => Number)
  monthlyFees: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  batchId: string;

  @IsEnum(TEST_SUBMISION)
  @IsOptional()
  @IsString({ each: true })
  test_submision?: TEST_SUBMISION;
}

export class updateAll {
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @ValidateNested()
  @Type(() => batchObject)
  @Optional()
  batches: batchObject;

  @IsString()
  @IsOptional()
  repoLink?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  studentBio?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  birthday?: string;

  @IsString()
  @IsOptional()
  joiningDate?: string;

  @IsNumber()
  @Type(() => Number)
  phoneNumber: number;

  @IsNumber()
  @Type(() => Number)
  advanceFee: number;

  @IsNumber()
  @Type(() => Number)
  admissionFees: number;

  @IsNumber()
  @Type(() => Number)
  monthlyFees: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  batchId: string;

  @IsEnum(TEST_SUBMISION)
  @IsOptional()
  @IsString({ each: true })
  test_submision?: TEST_SUBMISION;
}

export class updateOne {
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @ValidateNested()
  @Type(() => batchObject)
  @Optional()
  batches: batchObject;

  @IsString()
  @IsOptional()
  repoLink?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  studentBio?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  birthday?: string;

  @IsString()
  @IsOptional()
  joiningDate?: string;

  @IsNumber()
  @Type(() => Number)
  phoneNumber: number;

  @IsNumber()
  @Type(() => Number)
  advanceFee: number;

  @IsNumber()
  @Type(() => Number)
  admissionFees: number;

  @IsNumber()
  @Type(() => Number)
  monthlyFees: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  batchId: string;

  @IsEnum(TEST_SUBMISION)
  @IsOptional()
  @IsString({ each: true })
  test_submision?: TEST_SUBMISION;
}
