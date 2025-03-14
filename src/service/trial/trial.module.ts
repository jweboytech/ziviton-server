import { Module } from '@nestjs/common';
import { TrialController } from './trial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trial } from './entity/trial.entity';
import { TrialService } from './trial.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trial])],
  controllers: [TrialController],
  providers: [TrialService],
})
export class TrialModule {}
