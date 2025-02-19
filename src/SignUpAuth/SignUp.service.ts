import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { signup } from './signUpSchema/signUp.schema';
import { Model } from 'mongoose';
import { signUpDTO2 } from './SignUp.DTO/SignUp.DTO';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class signUpService {
  constructor(@InjectModel(signup.name) private signModel: Model<signup>) {}

  async signup(signUpDTO2: signUpDTO2) {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    } = signUpDTO2;
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword2 = await bcrypt.hash(confirm_password, 10);

    const signupModel = await this.signModel.create({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword2,
    });

    return { signupModel };
  }

  getSignUpData() {
    return this.signModel.find();
  }
}
