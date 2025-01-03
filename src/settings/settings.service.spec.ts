import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { SettingEntity, Units } from '@settings/entities/setting.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingDto } from '@settings/dto/update-setting.dto';

const mockUserId = 'mock-uuid';
const mockNotFoundUserId = 'mock-not-found-uuid';
const mockUpdateSettingsDto: UpdateSettingDto = { units: Units.Metric, cutoffs_selected: '1', measurement_distance: 1 };
const mockExistingSettings = new SettingEntity();
mockExistingSettings.created_by = mockUserId;

describe('SettingsService', () => {
  let service: SettingsService;
  let repository: Repository<SettingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: getRepositoryToken(SettingEntity),
          useValue: {
            findOneBy: jest
              .fn()
              .mockImplementation((query) =>
                Promise.resolve(query.created_by === mockUserId ? mockExistingSettings : null),
              ),
            update: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockImplementation((value) => Promise.resolve(value)),
          },
        },
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
    repository = module.get<Repository<SettingEntity>>(getRepositoryToken(SettingEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSettingsByUserId()', () => {
    it('should find settings', async () => {
      const findValue = await service.getSettingsByUserId(mockUserId);
      expect(findValue).toBe(mockExistingSettings);
    });

    it('should not modify if found', async () => {
      await service.getSettingsByUserId(mockUserId);
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should crete settings if not exists', async () => {
      const findValue = await service.getSettingsByUserId(mockNotFoundUserId);

      const expectedSettings = new SettingEntity();
      expectedSettings.created_by = mockNotFoundUserId;

      expect(repository.save).toHaveBeenCalledWith(expectedSettings);

      expect(findValue).toEqual(expectedSettings);
    });
  });

  describe('updateUserSettings()', () => {
    it('should not not return user settings', async () => {
      const updateValue = await service.updateUserSettings(mockUserId, mockUpdateSettingsDto);
      expect(updateValue).toBe(undefined);
    });

    it('should not update user settings', async () => {
      await service.updateUserSettings(mockUserId, mockUpdateSettingsDto);

      const updateCriteria = { created_by: mockUserId };
      const updateValue = { ...mockUpdateSettingsDto, modified_by: mockUserId };

      expect(repository.update).toHaveBeenCalledWith(updateCriteria, updateValue);
    });
  });
});
