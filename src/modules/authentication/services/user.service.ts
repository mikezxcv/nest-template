import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const data = await this.userRepository.find();
    if (!data.length) {
      throw new NotFoundException('data not found');
    }
    return data;
  }

  async findByUserName(username: string) {
    const data = await this.userRepository.findOneBy({ username });
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
    console.log(password);
    console.log(currentPassword);
    if (password !== currentPassword) return false;
    // return await bcrypt.compareSync(password, currentPassword);
    return true;
  }
}
