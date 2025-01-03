import { configLoader } from '../src/config/config.loader';
import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

const config = configLoader();

@Module({
  controllers: [MockController],
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class MockModule {}
