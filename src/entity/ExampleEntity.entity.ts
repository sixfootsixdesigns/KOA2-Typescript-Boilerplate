import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { validateOrReject } from 'class-validator';

@Entity()
export class ExampleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('json')
  @IsNotEmpty()
  definition: any;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @BeforeUpdate()
  @BeforeInsert()
  public validate(): Promise<void> {
    return validateOrReject(this, { validationError: { target: false, value: false } });
  }
}
