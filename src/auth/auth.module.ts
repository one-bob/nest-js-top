import { JwtStrategy } from './strategy/jwt.strategy';
import { getJWTConfig } from './../configs/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UserModel, UserSchema } from './models/user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
