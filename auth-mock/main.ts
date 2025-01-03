import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { MockModule } from './mock.module';

const bootstrap = async () => {
  const app = await NestFactory.create(MockModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  await app.listen(process.env.MOCK_PORT ?? 3004);
};

bootstrap();
