import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { PhonepeModule } from './phonepe/phonepe.module';

@Module({
  imports: [PaymentModule, PhonepeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
