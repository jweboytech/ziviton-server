import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { resourceUsage } from 'process';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCustomerDTO } from './dto/update.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  async insertOne(@Body() createDto: CreateCustomerDTO) {
    const record = await this.service.findOneByName(createDto.name);
    if (record == null) {
      const data = await this.service.insertOne(createDto);
      return data.identifiers[0].id;
    }

    throw new Error('客户已存在');
  }

  @Put()
  async updateOne(@Body() updateDto: UpdateCustomerDTO) {
    const { id, ...restDto } = updateDto;
    await this.service.updateOne(id, restDto);
    return true;
  }

  @Get('all')
  findAll() {
    return this.service.findAll();
  }
}
