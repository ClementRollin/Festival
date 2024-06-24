import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await hash(dto.password, 10);
      return this.users.save({...dto, hashedPassword});
    } catch {
      throw new ConflictException();
    }
  }

  findAll(): Promise<User[]> {
    return this.users.find();
  }

  async findOne(id: number): Promise<User> {
    const found = this.users.findOneBy({id});
    if (!found)
      throw new NotFoundException();
    return found;
  }

  async findByEmail(email: string): Promise<User> {
    const found = await this.users.findOneBy({ email });
    if (!found)
      throw new NotFoundException();
    return found;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      const userToUpdate = await this.findOne(id);
      const hashedPassword = await hash(dto.password, 10);

      const updatedUser = Object.assign(userToUpdate, dto, { hashedPassword });

      await this.users.save(updatedUser);
      return updatedUser;
    } catch(e) {
      throw e instanceof NotFoundException ? e : new ConflictException();
    }
  }

  async remove(id: number): Promise<void> {
    let done = await this.users.delete(id);
    if (done.affected != 1)
      throw new NotFoundException();
  }
}
