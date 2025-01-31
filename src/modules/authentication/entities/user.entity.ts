import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Profile } from './Profiles.entity';

@Entity({ name: 'users', schema: 'security' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => Profile, profile => profile.users)
  @JoinTable({
    name: 'user_profile', // Nombre de la tabla intermedia
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'profile_id',
      referencedColumnName: 'id',
    },
  })
  profiles: Profile[];
}