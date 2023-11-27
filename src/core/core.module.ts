import { Module } from '@nestjs/common';
import { UserModel } from './models/UserModel';
import { ArticleModel } from './models/ArticleModel';
import { DatabaseService } from './DatabaseService';
import { AuthGuard } from './guards/auth';
import { JwtTokenService } from './JwtTokenService';
import { FormattedResponse } from './interceptors/FormattedResponse';
import { ErrorsInterceptor } from './interceptors/ErrorInterceptor';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter';

@Module({
  providers: [
    UserModel,
    ArticleModel,
    DatabaseService,
    AuthGuard,
    JwtTokenService,
    FormattedResponse,
    ErrorsInterceptor,
    HttpExceptionFilter,
  ],
  controllers: [],
  imports: [],
  exports: [
    UserModel,
    ArticleModel,
    DatabaseService,
    AuthGuard,
    JwtTokenService,
    FormattedResponse,
    ErrorsInterceptor,
    HttpExceptionFilter,
  ],
})
export class CoreModule {}
