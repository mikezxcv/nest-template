import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './Permision.entity';

@Entity({ name: 'profiles', schema: 'security' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User, user => user.profiles)
  users: User[];

  @ManyToMany(() => Permission, permission => permission.profiles)
  @JoinTable({
    name: 'profile_permission', // Nombre de la tabla intermedia
    joinColumn: {
      name: 'profile_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}