import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppError } from 'src/errors/AppError';
import { EntityNotFound } from 'src/errors/entityNotFound';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
    };

    const user = await this.prisma.user.findFirst({
      where: {
        name: data.name,
      },
    });

    if (user) {
      throw new AppError('name or email already exists');
    }

    return await this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new EntityNotFound();
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new EntityNotFound();
    }

    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
