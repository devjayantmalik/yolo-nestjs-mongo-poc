import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
