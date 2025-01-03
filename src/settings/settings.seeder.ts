import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SettingEntity } from './entities/setting.entity';
import { Logger } from '@nestjs/common';

const logger = new Logger();

export default class SettingSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const examinationFactory = factoryManager.get(SettingEntity);
    await examinationFactory.save();
    logger.log(`Seeded setting entity for mock user`);
  }
}
