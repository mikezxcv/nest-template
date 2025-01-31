import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../common/security/jwt.strategy';
import { Permission } from './entities/Permision.entity';
import { ProfilePermission } from './entities/ProfilePermission.entity';
import { Profile } from './entities/Profiles.entity';
import { User } from './entities/user.entity';
import { UserPermission } from './entities/UserPermision.entity';
import { UserProfile } from './entities/UserProfile.entity';

@Module({
  imports: [
    PassportModule,
    // TypeOrmModule.forFeature([User, UserProfile, Profile, ProfilePermission, Permission, UserPermission]),
    TypeOrmModule.forFeature([User, UserProfile, Profile, ProfilePermission, Permission, UserPermission]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('TOKEN_EXPIRATION'),
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, JwtStrategy],
  exports: [UserService],
})
export class AuthenticationModule { }
