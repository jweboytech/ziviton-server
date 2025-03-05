import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDTO } from './dto/create.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>,
  ) {}

  findAll() {
    return this.repository
      .createQueryBuilder()
      .select()
      .orderBy('create_at', 'DESC')
      .getMany();
  }

  insertOne(createDto: CreateCustomerDTO) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(createDto)
      .execute();
  }

  findOneByName(name: string) {
    return this.repository
      .createQueryBuilder()
      .select()
      .where('name = :name', { name })
      .getOne();
  }
}
