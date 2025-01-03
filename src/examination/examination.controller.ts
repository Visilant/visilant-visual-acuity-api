import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { User } from '@auth/user.decorator';
import { UpdateExaminationDto } from '@examination/dto/update-examination.dto';

@Controller('examination')
export class ExaminationController {
  constructor(private readonly examinationService: ExaminationService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @User('id') userId: string) {
    return this.examinationService.findOne(id, userId);
  }

  @Get()
  getAllByUserId(@User('id') userId: string) {
    return this.examinationService.getAllByUserId(userId);
  }

  @Put()
  update(@Body() updateExaminationDto: UpdateExaminationDto, @User('id') userId: string) {
    return this.examinationService.upsert(updateExaminationDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User('id') userId: string) {
    return this.examinationService.remove(id, userId);
  }
}
