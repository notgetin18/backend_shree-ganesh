import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhonepeService } from './phonepe.service';
import { CreatePhonepeDto } from './dto/create-phonepe.dto';
import { UpdatePhonepeDto } from './dto/update-phonepe.dto';
import axios from 'axios';

const Payment_url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

@Controller('phonepe')
export class PhonepeController {
  constructor(private readonly phonepeService: PhonepeService) {}

  @Post('make-payment')
  create(@Body() data: any) {
    console.log('data=>', {
      data: data,
    });
    return this.phonepeService.creatPayment();
  }
}
