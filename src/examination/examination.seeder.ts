import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ExaminationEntity } from './entities/Examination.entity';
import { Logger } from '@nestjs/common';

const logger = new Logger();

export default class ExaminationSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const examinationFactory = factoryManager.get(ExaminationEntity);
    let seedRecordCount = 10;

    while (seedRecordCount--) {
      const seedData = await examinationFactory.make();
      await examinationFactory.save(seedData);
      logger.log(`Seeded examination entity for ${seedData.patient_name}`);
    }
  }
}
