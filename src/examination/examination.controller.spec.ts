import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationController } from './examination.controller';
import { ExaminationService } from './examination.service';
import { UpdateExaminationDto } from './dto/update-examination.dto';

const mockExamId = 'test_exam';
const mockUserId = 'test_user';
const mockUpdateExamDto = new UpdateExaminationDto();

describe('ExaminationController', () => {
  let controller: ExaminationController;
  let service: ExaminationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExaminationController],
      providers: [
        {
          provide: ExaminationService,
          useValue: {
            getAllByUserId: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            upsert: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExaminationController>(ExaminationController);
    service = module.get<ExaminationService>(ExaminationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('findOne()', async () => {
    controller.findOne(mockExamId, mockUserId);
    expect(service.findOne).toHaveBeenCalledWith(mockExamId, mockUserId);
  });

  test('getAllByUserId()', async () => {
    controller.getAllByUserId(mockUserId);
    expect(service.getAllByUserId).toHaveBeenCalledWith(mockUserId);
  });

  test('update()', async () => {
    controller.update(mockUpdateExamDto, mockUserId);
    expect(service.upsert).toHaveBeenCalledWith(mockUpdateExamDto, mockUserId);
  });

  test('remove()', async () => {
    controller.remove(mockExamId, mockUserId);
    expect(service.remove).toHaveBeenCalledWith(mockExamId, mockUserId);
  });
});
