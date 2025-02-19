import { Body, Controller, Patch, Post } from '@nestjs/common';
import { signUpDto } from './DTO/Auth.DTO';
import { AuthService } from './authentication.service';

@Controller('/auth')
export class AuthController {
  constructor(private AuthServiuce: AuthService) {}

  @Post('/login')
  login(@Body() signUpDto: signUpDto): Promise<{ token: string }> {
    return this.AuthServiuce.login(signUpDto);
  }

  @Patch('/login')
  updateLogin(@Body() signUpDto: signUpDto): Promise<{ token: string }> {
    return this.AuthServiuce.updateLogin(signUpDto);
  }
}
