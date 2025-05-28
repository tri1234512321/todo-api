import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { isValidObjectId, Model } from 'mongoose';
import { FindAllTodoDto } from './dto/find-all-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(dto: CreateTodoDto) {
    try {
      return await this.todoModel.create(dto);
    } catch {
      throw new BadRequestException('Dữ liệu tạo Todo không hợp lệ');
    }
  }

  async findAll(query: FindAllTodoDto) {
    try {
      const { status, keyword, page = '1', limit = '10' } = query;

      const filter: Record<string, any> = {};
      if (status !== undefined) filter.status = status === 'true';
      if (keyword) filter.title = { $regex: keyword, $options: 'i' };

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const [data, total] = await Promise.all([
        this.todoModel
          .find(filter)
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum)
          .lean(),
        this.todoModel.countDocuments(filter),
      ]);

      return {
        data,
        total,
        page: pageNum,
        limit: limitNum,
      };
    } catch {
      throw new InternalServerErrorException('Lỗi khi lấy danh sách Todo');
    }
  }

  async findOne(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID không hợp lệ');
      }
      const todo = await this.todoModel.findById(id).lean();
      if (!todo) {
        throw new NotFoundException(`Todo với ID ${id} không tồn tại`);
      }
      return todo;
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof NotFoundException
      ) {
        throw err;
      }
      throw new InternalServerErrorException('Lỗi khi lấy Todo');
    }
  }

  async update(id: string, dto: UpdateTodoDto) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID không hợp lệ');
      }
      const updated = await this.todoModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
      if (!updated) {
        throw new NotFoundException(`Không thể cập nhật Todo với ID ${id}`);
      }
      return updated;
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof NotFoundException
      ) {
        throw err;
      }
      throw new InternalServerErrorException('Lỗi khi cập nhật Todo');
    }
  }

  async remove(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID không hợp lệ');
      }
      const deleted = await this.todoModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new NotFoundException(`Không thể xóa Todo với ID ${id}`);
      }
      return;
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof NotFoundException
      ) {
        throw err;
      }
      throw new InternalServerErrorException('Lỗi khi xóa Todo');
    }
  }
}
