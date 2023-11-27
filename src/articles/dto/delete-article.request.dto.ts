import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteArticleRequestDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
