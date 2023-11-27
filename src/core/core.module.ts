import { Module } from '@nestjs/common';
import { UserModel } from './models/UserModel';
import { ArticleModel } from './models/ArticleModel';
import { DatabaseService } from './DatabaseService';
import { AuthGuard } from './guards/auth';
import { JwtTokenService } from './JwtTokenService';

@Module({
  providers: [UserModel, ArticleModel, DatabaseService, AuthGuard, JwtTokenService],
  controllers: [],
  imports: [],
  exports: [
    UserModel,
    ArticleModel,
    DatabaseService,
    AuthGuard,
    JwtTokenService,
  ],
})
export class CoreModule {}
