import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment')
  create(@Body() paymentDetail: CreatePaymentDto) {
    // console.log('paymentDetail == line 12 ==>', paymentDetail);
    return this.paymentService.create(paymentDetail);
  }
}
