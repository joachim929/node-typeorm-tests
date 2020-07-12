import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  fullName: string;

  @Column({default: true})
  isActive: boolean;

  @ManyToOne(() => User, user => user.children, {cascade: ['insert', 'update'], onDelete: 'SET NULL'})
  parent: User

  @OneToMany(() => User, mutation => mutation.parent, {cascade: true, onDelete: 'SET NULL'})
  children: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
