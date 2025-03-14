import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateTrialDTO } from './dto/create.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTrialDTO } from './dto/update.dto';
import { TrialService } from './trial.service';

@ApiTags('Trial')
@Controller('trial')
export class TrialController {
  constructor(private readonly service: TrialService) {}

  @Post()
  async insertOne(@Body() createDto: CreateTrialDTO) {
    const record = await this.service.findOneByName(createDto.name);
    if (record == null) {
      const data = await this.service.insertOne(createDto);
      return data.identifiers[0].id;
    }

    throw new Error('用户已存在');
  }

  @Put()
  async updateOne(@Body() updateDto: UpdateTrialDTO) {
    const { id, ...restDto } = updateDto;
    await this.service.updateOne(id, restDto);
    return true;
  }

  @Get('all')
  findAll() {
    return this.service.findAll();
  }
}
