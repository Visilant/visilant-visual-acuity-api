import { ExaminationEntity } from '@examination/entities/Examination.entity';
import { UpdateExaminationDto } from '@examination/dto/update-examination.dto';
export class ExaminationMapper {
  static updateDtoToEntity(createExaminationDto: UpdateExaminationDto): ExaminationEntity {
    const examination = new ExaminationEntity();

    examination.mobileId = createExaminationDto.mobileId;
    examination.left = createExaminationDto.left;
    examination.right = createExaminationDto.right;
    examination.leftPinhole = createExaminationDto.leftPinhole;
    examination.rightPinhole = createExaminationDto.rightPinhole;

    return examination;
  }

  static updateEntityWithUpdateDto(
    updateExaminationDto: UpdateExaminationDto,
    target: ExaminationEntity,
  ): ExaminationEntity {
    if (updateExaminationDto.left !== undefined) {
      target.left = updateExaminationDto.left;
    }
    if (updateExaminationDto.right !== undefined) {
      target.right = updateExaminationDto.right;
    }
    if (updateExaminationDto.leftPinhole) {
      target.leftPinhole = updateExaminationDto.leftPinhole;
    }
    if (updateExaminationDto.rightPinhole) {
      target.rightPinhole = updateExaminationDto.rightPinhole;
    }

    return target;
  }
}
