import { Module } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { CoreModule } from 'src/core/core.module';
import { ArticleModel } from 'src/core/models/ArticleModel';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [CoreModule, ArticleModel],
})
export class ArticlesModule {}
