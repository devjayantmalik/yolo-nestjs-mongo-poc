import { INestApplication, ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './environment/environment.service';
import * as cookieParser from 'cookie-parser';
import { DatabaseService } from './core/DatabaseService';
import {
  NextFunction,
  Request as HttpRequest,
  Response as HttpResponse,
} from 'express-serve-static-core';

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

  // configure error response.
  app.use(
    (err: Error, _req: HttpRequest, res: HttpResponse, _next: NextFunction) => {
      // We can check if err is instance of our custom error
      // and accordingly set response status code.
      const message = Array.isArray(err.message)
        ? err.message.join(', ')
        : err.message;
      return res.status(400).json({ success: false, data: {}, error: message });
    },
  );

  return app;
}
