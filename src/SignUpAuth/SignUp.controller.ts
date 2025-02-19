import { Body, Controller, Get, Post } from '@nestjs/common';
import { signUpDTO2 } from './SignUp.DTO/SignUp.DTO';
import { signUpService } from './SignUp.service';

@Controller('/auth')
export class SignUp {
  constructor(private signUpService: signUpService) {}

  @Post('/signup')
  signup(@Body() signUpDto: signUpDTO2) {
    return this.signUpService.signup(signUpDto);
  }

  @Get('/signup')
  getSignUP() {
    return this.signUpService.getSignUpData();
  }
}
