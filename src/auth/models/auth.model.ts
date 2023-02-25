import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  _id: true,
})
export class AuthModel {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
