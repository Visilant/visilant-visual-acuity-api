import { setSeederFactory } from 'typeorm-extension';
import { ExaminationEntity } from './entities/Examination.entity';

export default setSeederFactory(ExaminationEntity, (faker) => {
  const examination = new ExaminationEntity();
  examination.mobileId = faker.string.uuid();
  examination.created_by = '1';
  examination.patient_name = faker.person.fullName();
  examination.left = '0.04';
  examination.right = '0.04';
  examination.leftPinhole = '0.04';
  examination.rightPinhole = '0.04';

  return examination;
});
