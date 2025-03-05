import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
}
