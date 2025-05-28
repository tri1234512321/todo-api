import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Tiêu đề công việc cần làm',
    example: 'Hoàn thành bài test NestJS',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Nội dung chi tiết cho công việc',
    example: 'Hoàn thành CRUD Todo App',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description:
      'Trạng thái hoàn thành: true nếu đã hoàn thành, false nếu chưa',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({
    description: 'Ngày và giờ hoàn thành',
    example: '2025-05-28T10:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  dateTime?: string;
}
