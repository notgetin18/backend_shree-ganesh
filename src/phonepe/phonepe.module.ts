import { Module } from '@nestjs/common';
import { PhonepeService } from './phonepe.service';
import { PhonepeController } from './phonepe.controller';

@Module({
  controllers: [PhonepeController],
  providers: [PhonepeService],
})
export class PhonepeModule {}
