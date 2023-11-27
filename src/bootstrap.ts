import { INestApplication, ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './environment/environment.service';
import * as cookieParser from 'cookie-parser';

export async function bootstrap<App extends INestApplication>(
  app: App,
): Promise<App> {
  // Get config service to use some configuration properties
  const environment = app.get(EnvironmentService);

  const GLOBAL_PREFIX = environment.get('GLOBAL_PREFIX');

  // Serve all endpoints under some path prefix.
  if (GLOBAL_PREFIX) {
    app.setGlobalPrefix(GLOBAL_PREFIX);
  }

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
