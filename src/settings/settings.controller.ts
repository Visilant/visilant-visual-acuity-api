import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { User } from '@auth/user.decorator';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  get(@User('id') userId: string) {
    return this.settingsService.getSettingsByUserId(userId);
  }

  @Patch()
  update(@User('id') userId: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.updateUserSettings(userId, updateSettingDto);
  }
}
