import { Injectable } from '@nestjs/common';
import { EntityNotFound } from 'src/errors/entityNotFound';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const id =
      this.users.length == 0 ? 1 : this.users[this.users.length - 1].id + 1;
    const user: User = {
      ...createUserDto,
      id,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);
    if (!user) {
      throw new EntityNotFound();
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const newUser: User = {
      ...user,
      ...updateUserDto,
    };

    const index = this.users.indexOf(user);
    this.users[index] = newUser;

    return this.users[index];
  }

  remove(id: number) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }
}
