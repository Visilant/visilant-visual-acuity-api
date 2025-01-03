import { setSeederFactory } from 'typeorm-extension';
import { SettingEntity } from './entities/setting.entity';

export default setSeederFactory(SettingEntity, () => {
  const examination = new SettingEntity();
  examination.created_by = '1';

  return examination;
});
