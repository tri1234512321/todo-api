import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsBooleanString,
  IsString,
  IsNumberString,
} from 'class-validator';

export class FindAllTodoDto {
  @ApiPropertyOptional({
    description: 'Lọc theo trạng thái (true/false)',
    example: 'true',
  })
  @IsOptional()
  @IsBooleanString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Từ khóa tìm kiếm trong tiêu đề',
    example: 'NestJS',
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    description: 'Trang hiện tại',
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    description: 'Số lượng kết quả mỗi trang',
    example: '10',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
