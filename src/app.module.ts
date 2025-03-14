import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './service/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrialController } from './service/trial/trial.controller';
import { TrialModule } from './service/trial/trial.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          // url: process.env.DATABASE_URL,
          host: configService.get<string>('DATABASE_HOST'),
          port: parseInt(configService.get<string>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
          logging: true,
          extra: {
            max: 10, // 连接池中的最大连接数
            min: 2, // 连接池中的最小连接数
            idleTimeoutMillis: 30000, // 如果一个线程 30 秒钟内没有被使用过的话，那么就释放线程
          },
        };
      },
    }),
    CustomerModule,
    TrialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
