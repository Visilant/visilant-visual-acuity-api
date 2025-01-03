import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export class DateAndUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @Exclude()
  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();

  @Exclude()
  @Column({ type: 'uuid', nullable: true })
  created_by: string = '';

  @Exclude()
  @Column({ type: 'uuid', nullable: true })
  modified_by: string = '';
}
