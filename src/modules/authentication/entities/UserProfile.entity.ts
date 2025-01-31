import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import { Profile } from './Profiles.entity';
import { User } from './User.entity';

@Entity('user_profile', { schema: 'security' })
export class UserProfile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'profile_id' })
    profileId: number;

}