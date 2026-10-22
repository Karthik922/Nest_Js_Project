import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, UniqueConstraintError } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';
import { CursorMeta, PageMeta, PaginatedUsers } from './dto/paginated-users.dto.js';
import { User } from './user.model.js';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create({ ...createUserDto });
    } catch (err) {
      throw this.mapError(err);
    }
  }

  findAll(query: PaginationQueryDto): Promise<PaginatedUsers<PageMeta | CursorMeta>> {
    return query.cursor !== undefined
      ? this.findAllByCursor(query.cursor, query.limit)
      : this.findAllByPage(query.page ?? 1, query.limit);
  }

  private async findAllByPage(page: number, limit: number): Promise<PaginatedUsers<PageMeta>> {
    const { rows, count } = await this.userModel.findAndCountAll({
      order: [['id', 'ASC']],
      limit,
      offset: (page - 1) * limit,
    });
    const totalPages = Math.ceil(count / limit);
    return {
      data: rows,
      meta: {
        page,
        limit,
        total: count,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  // Keyset pagination: walks the primary-key index, so it stays fast at any depth.
  private async findAllByCursor(cursor: number, limit: number): Promise<PaginatedUsers<CursorMeta>> {
    const rows = await this.userModel.findAll({
      where: { id: { [Op.gt]: cursor } },
      order: [['id', 'ASC']],
      limit: limit + 1,
    });
    const hasNextPage = rows.length > limit;
    const data = hasNextPage ? rows.slice(0, limit) : rows;
    return {
      data,
      meta: {
        limit,
        nextCursor: hasNextPage ? data[data.length - 1].id : null,
        hasNextPage,
      },
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    try {
      return await user.update({ ...updateUserDto });
    } catch (err) {
      throw this.mapError(err);
    }
  }

  async remove(id: number): Promise<{ deleted: true; id: number }> {
    const user = await this.findOne(id);
    await user.destroy();
    return { deleted: true, id };
  }

  private mapError(err: unknown): unknown {
    if (err instanceof UniqueConstraintError) {
      return new ConflictException('Email already exists');
    }
    return err;
  }
}
