import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExaminationController } from './examination.controller';
import { ExaminationService } from './examination.service';
import { ExaminationEntity } from '@examination/entities/Examination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExaminationEntity])],
  controllers: [ExaminationController],
  providers: [ExaminationService],
})
export class ExaminationModule {}
