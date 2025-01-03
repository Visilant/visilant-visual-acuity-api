import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { ExaminationEntity } from '@examination/entities/Examination.entity';
import { ExaminationMapper } from '@examination/examination-mapper';

@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(ExaminationEntity)
    private examinationRepository: Repository<ExaminationEntity>,
  ) {}

  async upsert(examinationDto: UpdateExaminationDto, userId: string) {
    const mobileId = examinationDto.mobileId;
    const result = await this.examinationRepository.findOneBy({ mobileId, created_by: userId });

    if (result === null) {
      return await this.create(examinationDto, userId);
    } else {
      return await this.update(examinationDto.mobileId, userId, examinationDto);
    }
  }

  async create(createExaminationDto: UpdateExaminationDto, userId: string): Promise<ExaminationEntity> {
    const examination = ExaminationMapper.updateDtoToEntity(createExaminationDto);
    examination.created_by = userId;

    await this.examinationRepository.save(examination);

    return examination;
  }

  async findOne(mobileId: string, userId: string): Promise<ExaminationEntity> {
    const result = await this.examinationRepository.findOneBy({ mobileId, created_by: userId });

    if (result === null) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(
    mobileId: string,
    userId: string,
    updateExaminationDto: UpdateExaminationDto,
  ): Promise<ExaminationEntity> {
    const examination = await this.findOne(mobileId, userId);

    ExaminationMapper.updateEntityWithUpdateDto(updateExaminationDto, examination);
    examination.modified_by = userId;
    await this.examinationRepository.save(examination);

    return examination;
  }

  async remove(mobileId: string, userId: string): Promise<void> {
    await this.examinationRepository.softDelete({ mobileId, created_by: userId });
  }

  async getAllByUserId(userId: string): Promise<ExaminationEntity[]> {
    const examinations = await this.examinationRepository.findBy({
      created_by: userId,
    });
    return examinations;
  }
}
