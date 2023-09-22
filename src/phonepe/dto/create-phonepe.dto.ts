import { IsNotEmpty } from 'class-validator';
export class CreatePhonepeDto {
    @IsNotEmpty()
    merchantTransactionId: string;
    
    @IsNotEmpty()
    merchantUserId:string;

    @IsNotEmpty()
    amount:string;

    @IsNotEmpty()
    mobileNumber:string;

  
}


