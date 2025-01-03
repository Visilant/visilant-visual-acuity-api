import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationService } from './examination.service';
import { ExaminationEntity } from './entities/Examination.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateExaminationDto } from './dto/create-examination.dto';
import { Repository } from 'typeorm';
import { UpdateExaminationDto } from './dto/update-examination.dto';

const mockExamId = 'test_exam';
const mockUserId = 'test_user';
const mockExamination = new ExaminationEntity();
mockExamination.created_by = mockUserId;
const mockCreateExamDto = new CreateExaminationDto();
const mockUpdateExamDto = new UpdateExaminationDto();

describe('ExaminationService', () => {
  let service: ExaminationService;
  let repository: Repository<ExaminationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExaminationService,
        {
          provide: getRepositoryToken(ExaminationEntity),
          useValue: {
            findBy: jest
              .fn()
              .mockImplementation((query) =>
                Promise.resolve(query.created_by === mockUserId ? [mockExamination] : null),
              ),
            findOneBy: jest
              .fn()
              .mockImplementation((query) => Promise.resolve(query.mobileId === mockExamId ? mockExamination : null)),
            insert: jest.fn().mockResolvedValue({ identifiers: [{ id: mockExamId }] }),
            update: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            softDelete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ExaminationService>(ExaminationService);
    repository = module.get<Repository<ExaminationEntity>>(getRepositoryToken(ExaminationEntity));
  });

  test('create()', async () => {
    const result = await service.create(mockCreateExamDto, mockUserId);
    const created = { ...mockExamination, ...mockCreateExamDto, created_by: mockUserId };

    expect(repository.save).toBeCalledWith(created);
    expect(result).toEqual(created);
  });

  test('findOne()', async () => {
    const result = await service.findOne(mockExamId, mockUserId);
    expect(repository.findOneBy).toBeCalledWith({ mobileId: mockExamId, created_by: mockUserId });
    expect(result).toBe(mockExamination);
  });

  test('update()', async () => {
    const result = await service.update(mockExamId, mockUserId, mockUpdateExamDto);
    const updated = { ...mockExamination, ...mockUpdateExamDto, modified_by: mockUserId };

    expect(repository.save).toBeCalledWith(updated);
    expect(result).toEqual(updated);
  });

  test('upsert()', async () => {
    await service.upsert(mockUpdateExamDto, mockUserId);
    new ExaminationEntity();

    expect(repository.save).toHaveBeenCalled();
  });

  test('remove()', async () => {
    await service.remove(mockExamId, mockUserId);
    expect(repository.softDelete).toBeCalledWith({ mobileId: mockExamId, created_by: mockUserId });
  });

  test('getAllByUserId()', async () => {
    const result = await service.getAllByUserId(mockUserId);
    expect(repository.findBy).toBeCalledWith({ created_by: mockUserId });
    expect(result[0].created_by).toBe(mockUserId);
  });
});
