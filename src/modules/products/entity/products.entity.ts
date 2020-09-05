import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entity/users.entity';

@Entity()
export class Products {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'user_id' })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => Users,
    users => users.productsConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  usersConnection: Promise<Users>;
}
