import { UserRole, UserVerifyStatus } from 'src/utils/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: null })
  fullName: string;

  @Column({ default: null })
  phone: string;

  @Column({ default: null })
  age: string;

  @Column({ default: null })
  refresh_token: string;

  @Column({
    type: 'enum',
    enum: UserVerifyStatus,
    default: UserVerifyStatus.Unverified,
  })
  verify: UserVerifyStatus;

  @Index()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => AddressEntity, (address) => address.user_id, {
    cascade: true,
  })
  address: AddressEntity[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
