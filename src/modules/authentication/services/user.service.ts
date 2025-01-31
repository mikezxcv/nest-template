import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignupDto } from '../dto/login.dto';
import { UserProfile } from '../entities/UserProfile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) { }

  async findAll() {
    const data = await this.userRepository.find();
    if (!data.length) {
      throw new NotFoundException('data not found');
    }
    return data;
  }

  async findByEmail(email: string) {
    const data = await this.userRepository.findOneBy({ email: email });
    if (!data) throw new NotFoundException('User Not Found');
    return data;
  }

  async findUserById(id: number) {
    const data = await this.userRepository.findOneBy({ id });
    if (!data) throw new NotFoundException('User Not found');
    return data;
  }

  async validatePassword(
    password: string,
    currentPassword: string,
  ): Promise<boolean> {
    const valid = await bcrypt.compare(password, currentPassword);
    if (!valid) return false;
    return true;
  }

  async createUser(request: SignupDto) {
    const userExists = await this.userRepository.findOneBy({ email: request.email });
    if (userExists) throw new BadRequestException('User Already Exists');

    let user = this.userRepository.create(request);
    user.password = await bcrypt.hash(request.password, 10);
    user = await this.userRepository.save(user);
    console.log("user", user);
    const userProfile = this.userProfileRepository.create({
      userId: user.id,
      profileId: request.profile_id,
    });
    await this.userProfileRepository.save(userProfile);

    // retornar el usuario con el rol y los permisos
    const userData = await this.getUserInformation(user.email);
    return userData;
  }

  async getAllwithProfiles() {
    return await this.userRepository.find({ relations: ['profiles'] });
  }

  async getUserInformation(email: string) {
    return await this.userRepository.findOne({
      where: { email: email }, relations: ['profiles', 'profiles.permissions'],
    });
  }
}
