import { IsOptional, IsString } from 'class-validator';

export class FileDto {
  @IsString()
  @IsOptional()
  fileName?: string;
}
