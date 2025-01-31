import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { JWTPayload } from 'src/common/security/jwt.payload';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/Profiles.entity';
import { Permission } from '../entities/Permision.entity';
import { UserSignupAuthentication } from '../interfaces/authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,

  ) { }

  async findAll() {
    return this.userService.findAll();
  }

  async login(request: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = request;
    const valid = await this.validateUser(email, password);
    if (!valid) throw new UnauthorizedException('Not Valid Credentials');
    const user = await this.userService.getUserInformation(email);

    const token = await this.generateAccessToken({
      ...user,
      profiles: user.profiles.map(profile => profile.name),
      permissions: user.profiles.map(profile => profile.permissions.map(permission => permission.name)).flat(),
    });

    return token;


  }

  private async validateUser(username: string, password: string) {
    const user = await this.userService.findByEmail(username);
    return await this.userService.validatePassword(password, user.password);
  }

  private async generateAccessToken(
    data: UserSignupAuthentication,
  ): Promise<LoginResponseDto> {
    const payload: JWTPayload = data;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async signup(request: any): Promise<LoginResponseDto> {
    const user = await this.userService.createUser(request);
    const userData: UserSignupAuthentication = {
      ...user,
      profiles: user.profiles.map(profile => profile.name),
      permissions: user.profiles.map(profile => profile.permissions.map(permission => permission.name)).flat(),
    };

    return await this.generateAccessToken(userData);
  }

  async getAllUsers() {
    return await this.userService.getAllwithProfiles();
  }

  async getAllProfiles() {
    return await this.profileRepository.find({ relations: ['permissions'] });
  }

  async getAllPermissions() {
    return await this.permissionRepository.find();
  }

}
