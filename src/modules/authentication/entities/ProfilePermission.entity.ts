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
import { Permission } from './Permision.entity';
import { Profile } from './Profiles.entity';

@Entity('profile_permission', { schema: 'security' })
export class ProfilePermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'profile_id' })
    profileId: number;

    @Column({ name: 'permission_id' })
    permissionId: number;

}