import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiExtraModels,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindAllTodoDto } from './dto/find-all-todo.dto';

@ApiTags('Todos')
@ApiExtraModels(FindAllTodoDto)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới Todo' })
  @ApiCreatedResponse({ description: 'Todo được tạo thành công.' })
  @ApiBadRequestResponse({ description: 'Dữ liệu không hợp lệ.' })
  @HttpCode(201)
  create(@Body() dto: CreateTodoDto) {
    return this.todoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả Todo' })
  @ApiOkResponse({ description: 'Lấy danh sách thành công.' })
  @ApiBadRequestResponse({ description: 'Tham số truy vấn không hợp lệ.' })
  findAll(@Query() query: FindAllTodoDto) {
    return this.todoService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy Todo theo ID' })
  @ApiOkResponse({ description: 'Tìm thấy Todo.' })
  @ApiBadRequestResponse({ description: 'ID không hợp lệ.' })
  @ApiNotFoundResponse({ description: 'Todo không tồn tại.' })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật Todo' })
  @ApiOkResponse({ description: 'Cập nhật thành công.' })
  @ApiBadRequestResponse({ description: 'ID hoặc dữ liệu không hợp lệ.' })
  @ApiNotFoundResponse({ description: 'Todo không tồn tại.' })
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa Todo' })
  @ApiNoContentResponse({ description: 'Xóa thành công.' })
  @ApiBadRequestResponse({ description: 'ID không hợp lệ.' })
  @ApiNotFoundResponse({ description: 'Todo không tồn tại.' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
