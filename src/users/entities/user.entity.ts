import { StatusUser } from 'src/enums/users';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'varchar', length: 20, nullable: true, default: '' })
  phone: string;

  @Column({
    type: 'enum',
    enum: StatusUser,
    default: StatusUser.PENDING,
    nullable: true,
  })
  status: StatusUser;
}
