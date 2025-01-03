import { IsOptional, IsString } from 'class-validator';

export class UpdateExaminationDto {
  @IsString()
  mobileId: string;

  @IsString()
  @IsOptional()
  patient_name: string;

  @IsString()
  @IsOptional()
  left?: string;

  @IsString()
  @IsOptional()
  right?: string;

  @IsString()
  @IsOptional()
  leftPinhole?: string;

  @IsString()
  @IsOptional()
  rightPinhole?: string;
}
