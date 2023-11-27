import { Module } from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { CoreModule } from 'src/core/core.module';
import { ArticleModel } from 'src/core/models/ArticleModel';

@Module({
  providers: [AccountsService],
  controllers: [AccountsController],
  imports: [CoreModule, ArticleModel],
})
export class AccountsModule {}
