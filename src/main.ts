import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './environment/environment.service';
import { bootstrap } from './bootstrap';

async function main() {
  const app = await NestFactory.create(AppModule);
  const environment = app.get(EnvironmentService);

  // Bootstrap your application with all exception filters and middlewares.
  await bootstrap(app);

  await app.listen(environment.get('PORT'));
}

main();
