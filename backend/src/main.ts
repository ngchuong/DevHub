import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const session = require('express-session');
const passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure session middleware
  app.use(
    session({
      secret:
        process.env.SESSION_SECRET || 'devhub-secret-key-change-in-production',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        sameSite: 'lax',
      },
    }),
  );

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Enable validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS with credentials
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('Server started on http://0.0.0.0:3000');
}
bootstrap().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
