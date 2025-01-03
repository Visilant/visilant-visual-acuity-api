import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from '@settings/dto/update-setting.dto';
import { Units } from '@settings/entities/setting.entity';

const mockUserId = 'mock-uuid';
const mockUpdateSettingsDto: UpdateSettingDto = { units: Units.Metric, cutoffs_selected: '1', measurement_distance: 1 };

describe('SettingsController', () => {
  let controller: SettingsController;
  let service: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsService,
          useValue: {
            getSettingsByUserId: jest.fn().mockResolvedValue({}),
            updateUserSettings: jest.fn().mockResolvedValue({}),
            getForUser: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
    service = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('get()', () => {
    controller.get(mockUserId);
    expect(service.getSettingsByUserId).toHaveBeenCalledWith(mockUserId);
  });

  test('update()', () => {
    controller.update(mockUserId, mockUpdateSettingsDto);
    expect(service.updateUserSettings).toHaveBeenCalledWith(mockUserId, mockUpdateSettingsDto);
  });
});
