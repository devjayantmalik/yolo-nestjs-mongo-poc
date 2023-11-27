import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateArticleRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
