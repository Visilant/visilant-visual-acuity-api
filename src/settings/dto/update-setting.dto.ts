import { SettingEntity } from '@settings/entities/setting.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateSettingDto extends PickType(SettingEntity, [
  'measurement_distance',
  'cutoffs_selected',
  'units',
] as const) {}
