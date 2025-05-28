import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: 'Tiêu đề của công việc',
    example: 'Xong bài test NestJS',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Nội dung chi tiết của công việc',
    example: 'Xong CRUD Todo App',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Trạng thái hoàn thành: true nếu đã hoàn thành, false nếu chưa',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({
    description: 'Thời gian hoàn thành công việc',
    example: '2025-06-01T10:30:00Z',
  })
  @IsOptional()
  @IsDateString()
  dateTime?: string;
}
