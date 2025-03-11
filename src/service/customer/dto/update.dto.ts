import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateCustomerDTO {
  @ApiProperty()
  remark: string;

  @IsNotEmpty({ message: 'ID不能为空' })
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  id: number;
}
