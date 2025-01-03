import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DB_TYPE, configLoader } from './config.loader';
import { ExaminationEntity } from '../examination/entities/Examination.entity';
import 'dotenv/config';
import { SettingEntity } from '@settings/entities/setting.entity';

const config = configLoader();

const options: DataSourceOptions & SeederOptions = {
  type: config.database.type as DB_TYPE,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [ExaminationEntity, SettingEntity],
  seeds: ['src/**/*.seeder.ts'],
  factories: ['src/**/*.factory.ts'],
  synchronize: true,
};

export const dataSource = new DataSource(options);
