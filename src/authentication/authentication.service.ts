import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './Schemas/user.schema';
import { signUpDto } from './DTO/Auth.DTO';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(signUpDto: signUpDto): Promise<{ token: string }> {
    const { email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registerModel = await this.UserModel.create({
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: registerModel._id });

    return { token };
  }

  async updateLogin(signUpDto: signUpDto): Promise<{ token: string }> {
    const { email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registerModel = await this.UserModel.create({
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: registerModel._id });

    return { token };
  }
}
