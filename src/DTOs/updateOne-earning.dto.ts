import { PartialType } from '@nestjs/mapped-types';
import { CreateEarningDto } from './create-earning.dto';

export class UpdateOneEarningDto extends PartialType(CreateEarningDto) {}
