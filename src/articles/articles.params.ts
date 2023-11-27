import { IsString, IsMongoId } from 'class-validator';

export class ArticleIdParam {
  @IsString()
  @IsMongoId()
  id: string;
}