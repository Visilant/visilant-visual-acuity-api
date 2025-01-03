import { Column, Entity } from 'typeorm';
import { DateAndUser } from '@utils/Base.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum Units {
  Metric = 'Metric',
  Imperial = 'Imperial',
}

@Entity('settings')
export class SettingEntity extends DateAndUser {
  @IsNumber()
  @Column()
  measurement_distance: number = 1;

  @IsEnum(Units)
  @Column()
  units: Units = Units.Metric;

  @IsString()
  @Column()
  cutoffs_selected: string = '';
}
