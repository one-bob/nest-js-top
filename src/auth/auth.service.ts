import { USER_NOT_FOUND, PASSWORD_INCORRECT } from './auth.constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './models/user.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);
    const newUser = new this.userModel({
      email: dto.login,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  async findUser(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(PASSWORD_INCORRECT);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = {
      email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
