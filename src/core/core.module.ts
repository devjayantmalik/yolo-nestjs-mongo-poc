import { Module } from '@nestjs/common';
import { UserModel } from './models/UserModel';
import { ArticleModel } from './models/ArticleModel';
import { DatabaseService } from './DatabaseService';
import { AuthGuard } from './guards/auth';

@Module({
  providers: [UserModel, ArticleModel, DatabaseService, AuthGuard],
  controllers: [],
  imports: [],
  exports: [UserModel, ArticleModel, DatabaseService, AuthGuard],
})
export class CoreModule {}
