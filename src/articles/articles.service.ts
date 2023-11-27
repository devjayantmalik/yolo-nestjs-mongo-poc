import { Injectable } from '@nestjs/common';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';
import { ArticleModel } from 'src/core/models/ArticleModel';
import { ListArticleResponseDto } from './dto/list-article.response.dto';
import { UpdateArticleRequestDto } from './dto/update-article.request.dto';
import { DeleteArticleRequestDto } from './dto/delete-article.request.dto';

@Injectable()
export class ArticlesService {
  private readonly articleModel: typeof ArticleModel = ArticleModel;
  constructor() {}

  async create(
    dto: CreateArticleRequestDto,
    user_id: string,
  ): Promise<CreateArticleResponseDto> {
    const article = await this.articleModel.create({
      title: dto.title,
      description: dto.description,
      content: dto.content,
      is_draft: true,
      owner: user_id,
    });

    return {
      id: article._id.toString(),
      title: article.title,
      content: article.content,
      description: article.description,
    };
  }

  async list(user_id: string): Promise<ListArticleResponseDto[]> {
    const articles = await this.articleModel.find({ owner: user_id });

    return articles.map((article) => ({
      id: article._id.toString(),
      title: article.title,
      content: article.content,
      description: article.description,
    }));
  }

  async update(dto: UpdateArticleRequestDto, user_id: string): Promise<void> {
    const article = await this.articleModel.updateOne(
      { owner: user_id, _id: dto.id },
      // Removes undefined values
      JSON.parse(
        JSON.stringify({
          title: dto.title,
          content: dto.content,
          description: dto.description,
        }),
      ),
    );

    if (article.modifiedCount != 1) {
      throw new Error(
        `Article with provided id: ${article.upsertedId} does not exist.`,
      );
    }
  }

  async delete(dto: DeleteArticleRequestDto, user_id: string): Promise<void> {
    const article = await this.articleModel.deleteOne({
      owner: user_id,
      _id: dto.id,
    });

    if (article.deletedCount != 1) {
      throw new Error(`Article with provided id: ${dto.id} does not exist.`);
    }
  }
}
