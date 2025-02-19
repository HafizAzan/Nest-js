import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { signSchema } from './signUpSchema/signUp.schema';
import { SignUp } from './SignUp.controller';
import { signUpService } from './SignUp.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'signup', schema: signSchema }]),
  ],
  controllers: [SignUp],
  providers: [signUpService],
})
export class signupmodule {}
