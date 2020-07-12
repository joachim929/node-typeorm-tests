import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['parent', 'children']
    });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async getUser(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail({
      where: [{ id }]
    });
  }

  async updateUser(user: User) {
    return this.usersRepository.save(user)
  }

  async deleteUser(user: User) {
    return this.usersRepository.delete(user);
  }
}
