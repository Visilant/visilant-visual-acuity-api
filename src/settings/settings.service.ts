import { Injectable } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingEntity } from '@settings/entities/setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingEntity)
    private settingRepository: Repository<SettingEntity>,
  ) {}
  async getSettingsByUserId(userId: string): Promise<SettingEntity> {
    let settings = await this.settingRepository.findOneBy({
      created_by: userId,
    });

    if (settings === null) {
      const userSetting = new SettingEntity();
      userSetting.created_by = userId;

      settings = await this.settingRepository.save(userSetting);
    }

    return settings;
  }

  async updateUserSettings(userId: string, updateSettingDto: UpdateSettingDto) {
    await this.settingRepository.update({ created_by: userId }, { ...updateSettingDto, modified_by: userId });
  }
}
