import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  Param,
  UseFilters,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ArticlesService } from './articles.service';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';
import { ListArticleResponseDto } from './dto/list-article.response.dto';
import { UpdateArticleRequestDto } from './dto/update-article.request.dto';
import { DeleteArticleRequestDto } from './dto/delete-article.request.dto';
import { AuthGuard } from 'src/core/guards/auth';
import { FormattedResponse } from 'src/core/interceptors/FormattedResponse';
import { ArticleIdParam } from './articles.params';
import { HttpExceptionFilter } from 'src/core/filters/HttpExceptionFilter';
import { ErrorsInterceptor } from 'src/core/interceptors/ErrorInterceptor';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(FormattedResponse, ErrorsInterceptor)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // We override global rate limit to 5 Requests every 5 minutes.
  @Throttle({ default: { limit: 5, ttl: 5 * 60 * 1000 } })
  @UseGuards(AuthGuard)
  @Post('/')
  async create(
    @Body() articleDto: CreateArticleRequestDto,
    @Headers() headers,
  ): Promise<CreateArticleResponseDto> {
    try {
      return await this.articlesService.create(articleDto, headers.userId);
    } catch (error) {
      // We are re throwing error here, because you con control
      // what info gets dispached along with error.
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async details(
    @Headers() headers,
    @Param() params: ArticleIdParam,
  ): Promise<ListArticleResponseDto> {
    try {
      return await this.articlesService.details(headers.userId, params.id);
    } catch (error) {
      // We are re throwing error here, because you con control
      // what info gets dispached along with error.
      throw new Error(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async list(@Headers() headers): Promise<ListArticleResponseDto[]> {
    try {
      return await this.articlesService.list(headers.userId);
    } catch (error) {
      // We are re throwing error here, because you con control
      // what info gets dispached along with error.
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Put('/')
  async update(
    @Headers() headers,
    @Body() articleDto: UpdateArticleRequestDto,
  ): Promise<void> {
    try {
      // We are re throwing error here, because you con control
      // what info gets dispached along with error.
      return await this.articlesService.update(articleDto, headers.userId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/')
  async delete(
    @Headers() headers,
    @Body() articleDto: DeleteArticleRequestDto,
  ): Promise<void> {
    try {
      // We are re throwing error here, because you con control
      // what info gets dispached along with error.
      return await this.articlesService.delete(articleDto, headers.userId);
    } catch (error) {
      throw error;
    }
  }
}
