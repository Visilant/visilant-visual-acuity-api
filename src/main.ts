import { ClassSerializerInterceptor, VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WrapperInterceptor } from '@utils/wrapper/wrapper.interceptor';
import helmet from 'helmet';
import { AppModule } from '@app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new WrapperInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Visual Acuity application backend')
    .setDescription(
      `This application provides the necessary backend functionality for the Visilant Visual Acuity mobile application. 
      Every response is wrapped in an object containing three properties: statusCode, message and data. 
      The response shown in the documentation could be found on the root object's data property.`,
    )
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // TODO: Move this to env
  await app.listen(3000);
}
bootstrap();
