import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignupRequestDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
