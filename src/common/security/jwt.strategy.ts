import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../modules/authentication/services/user.service';
import { UserDTO } from '../../modules/authentication/dto/user.dto';
import { JWTPayload } from './jwt.payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'),
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    const user = await this.usersService.getUserInformation(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      ...user,
      profiles: user.profiles.map(profile => profile.name),
      permissions: user.profiles.map(profile => profile.permissions.map(permission => permission.name)).flat(),
    };
  }
}
