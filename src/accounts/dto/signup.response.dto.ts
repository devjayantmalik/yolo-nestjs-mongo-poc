import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SignupResponseDto {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;
}
