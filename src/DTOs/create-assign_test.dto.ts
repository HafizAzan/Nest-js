import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ASSIGNED_STUDENT_STATUS,
  ASSIGNED_TEST_STATUS,
} from '../constant/constant';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateBmAssignedTestDto {
  @IsString()
  @IsNotEmpty()
  testName?: string;

  @Type(() => Date)
  @IsDate()
  assignedDate: Date;

  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  studentName?: string;

  @IsEnum(ASSIGNED_TEST_STATUS)
  @IsNotEmpty()
  @IsString({ each: true })
  testApproval?: ASSIGNED_TEST_STATUS[];

  @IsEnum(ASSIGNED_STUDENT_STATUS)
  @IsNotEmpty()
  @IsString({ each: true })
  student_status?: ASSIGNED_STUDENT_STATUS[];
}

export class UpdateBmAssignedTestDto extends PartialType(
  CreateBmAssignedTestDto,
) {}

export class UpdateOneBmAssignedTestDto extends PartialType(
  CreateBmAssignedTestDto,
) {}
