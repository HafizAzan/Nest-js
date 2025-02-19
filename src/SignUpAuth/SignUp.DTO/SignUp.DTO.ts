import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class signUpDTO2 {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsEmail({}, { message: 'Plz Enter Correct Email' })
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly confirm_password: string;
}
