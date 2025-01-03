import { IsOptional, IsString } from 'class-validator';

export class CreateExaminationDto {
  @IsString()
  mobileId: string;

  @IsString()
  patient_name: string = '';

  @IsString()
  @IsOptional()
  left: string;

  @IsString()
  @IsOptional()
  right: string;

  @IsString()
  @IsOptional()
  leftPinhole: string;

  @IsString()
  @IsOptional()
  rightPinhole: string;
}
