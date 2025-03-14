import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trial } from './entity/trial.entity';
import { Repository } from 'typeorm';
import { CreateTrialDTO } from './dto/create.dto';
import { UpdateTrialDTO } from './dto/update.dto';

@Injectable()
export class TrialService {
  constructor(
    @InjectRepository(Trial)
    private repository: Repository<Trial>,
  ) {}

  findAll() {
    return this.repository
      .createQueryBuilder()
      .select()
      .orderBy('create_at', 'DESC')
      .getMany();
  }

  insertOne(createDto: CreateTrialDTO) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(Trial)
      .values(createDto)
      .execute();
  }

  updateOne(id: number, updateDto: Omit<UpdateTrialDTO, 'id'>) {
    return this.repository
      .createQueryBuilder()
      .update(Trial)
      .where('id = :id', { id })
      .set(updateDto)
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
