import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { DateAndUser } from '@utils/Base.entity';

@Entity('examination')
export class ExaminationEntity extends DateAndUser {
  @IsString()
  @Column({ unique: true })
  mobileId: string;

  @IsString()
  @Column()
  patient_name: string = '';

  @IsString()
  @Column({ nullable: true })
  left?: string;

  @IsString()
  @Column({ nullable: true })
  right?: string;

  @IsString()
  @Column({ nullable: true })
  leftPinhole?: string;

  @IsString()
  @Column({ nullable: true })
  rightPinhole?: string;
}
