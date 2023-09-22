import { IsNotEmpty } from 'class-validator';
export class CreatePaymentDto {
  @IsNotEmpty()
  txnid: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  productinfo: string;

  @IsNotEmpty()
  furl: string;

  @IsNotEmpty()
  surl: string;

  @IsNotEmpty()
  hash: string;

  @IsNotEmpty()
  customerId: string;
}
