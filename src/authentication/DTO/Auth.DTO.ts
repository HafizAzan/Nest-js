import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class signUpDto {
  // @IsString()
  // @IsNotEmpty()
  // readonly name: string;

  @IsEmail({}, { message: 'Plz Enter Correct Email' })
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
