import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<Todo>;

  const mockTodo: any = {
    _id: 'abc123',
    title: 'Test Title',
    content: 'Test Content',
    status: false,
    dateTime: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTodoModel = {
    new: jest.fn().mockResolvedValue(mockTodo),
    constructor: jest.fn().mockResolvedValue(mockTodo),
    create: jest.fn().mockResolvedValue(mockTodo),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([mockTodo]),
    }),
    findById: jest.fn().mockResolvedValue(mockTodo),
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValue({ ...mockTodo, title: 'Updated' }),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockTodo),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<Todo>>(getModelToken(Todo.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const dto = { title: 'Test Title', content: 'Test Content', status: false };
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockTodo);
    const result = await service.create(dto);
    expect(result).toEqual(mockTodo);
  });

  it('should return todos with findAll', async () => {
    const result = await service.findAll({ page: '1', limit: '10' });
    expect(result).toEqual([mockTodo]);
  });

  it('should return a single todo with findOne', async () => {
    const result = await service.findOne('abc123');
    expect(result).toEqual(mockTodo);
  });

  it('should update a todo', async () => {
    const dto = { title: 'Updated' };
    const result = await service.update('abc123', dto);
    expect(result?.title).toBe('Updated');
  });

  it('should delete a todo', async () => {
    const result = await service.remove('abc123');
    expect(result).toEqual(mockTodo);
  });
});
