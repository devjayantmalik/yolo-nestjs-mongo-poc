import { INestApplication, ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './environment/environment.service';
import * as cookieParser from 'cookie-parser';
import { DatabaseService } from './core/DatabaseService';

export async function bootstrap<App extends INestApplication>(
  app: App,
): Promise<App> {
  // load environment service
  const environment = app.get(EnvironmentService);

  // connect to database
  const database = app.get(DatabaseService);
  await database.connect(environment.get('MONGO_DB_URL'));

  // Serve all endpoints under some path prefix.
  const GLOBAL_PREFIX = '/' + environment.get('GLOBAL_PREFIX');
  if (GLOBAL_PREFIX) app.setGlobalPrefix(GLOBAL_PREFIX);

  // TODO: Add Error Handing Support

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: process.env.NODE_ENV === 'development',
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  app.use(cookieParser());

  return app;
}
