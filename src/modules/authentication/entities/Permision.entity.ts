import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Profile } from './Profiles.entity';

@Entity({ name: 'permissions', schema: 'security' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Profile, profile => profile.permissions)
  profiles: Profile[];
}