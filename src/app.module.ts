import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ArticlesModule } from './articles/articles.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    EnvironmentModule,

    // Global Rate limiting to just
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000, // 60 seconds = 1 minute
        limit: 100, // Max of 100 Requests every 1 minute
      },
    ]),

    CoreModule,
    ArticlesModule,
  ],
})
export class AppModule {}
