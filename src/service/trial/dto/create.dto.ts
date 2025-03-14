import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrialDTO {
  @IsNotEmpty({ message: '姓名不能为空' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  @ApiProperty()
  phone: string;
}
