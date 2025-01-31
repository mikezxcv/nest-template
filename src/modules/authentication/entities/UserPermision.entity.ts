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
import { User } from './User.entity';

@Entity('user_permission', { schema: 'security' })
export class UserPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'permission_id' })
    permissionId: number;

    // @ManyToOne(() => User, (user) => user.userPermissions)
    // @JoinColumn({ name: 'user_id' })
    // user: User;

    // @ManyToOne(() => Permission, (permission) => permission.userPermissions)
    // @JoinColumn({ name: 'permission_id' })
    // permission: Permission;
}