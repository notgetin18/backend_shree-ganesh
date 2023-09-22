import { Injectable } from '@nestjs/common';
import { CreatePhonepeDto } from './dto/create-phonepe.dto';
import { UpdatePhonepeDto } from './dto/update-phonepe.dto';
import axios from 'axios';
import * as crypto from 'crypto';

const Payment_url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

@Injectable()
export class PhonepeService {
  async creatPayment() {
    const paymentData_web = {
      "merchantId": "PGTESTPAYUAT140",  
      "merchantTransactionId": "BDG850590068188134",
      "merchantUserId": "USERID12334534123",
      "amount": 10000,
      "redirectUrl": "https://webhook.site/redirect-url",
      "redirectMode": "POST",
      "callbackUrl": "https://webhook.site/callback-url",
      "mobileNumber": "7703990600",
      "paymentInstrument": {
        "type": "PAY_PAGE"
      }
    }
    const paymentData = {
      merchantId: 'PGTESTPAYUAT140',
      merchantTransactionId: 'BDG1234567',
      merchantUserId: 'USERID112345',
      amount: 90000,
      callbackUrl: 'https://mykewlapp.com/callback',
      mobileNumber: '7703990600',
      paymentInstrument: {
        type: 'UPI_QR',
      },
    };

    function jsonToBase64(object) {
      const json = JSON.stringify(object);
      return Buffer.from(json).toString('base64');
    }

    const bs64 = jsonToBase64(paymentData);
    const makeDataForHash = `${bs64}/pg/v1/pay775765ff-824f-4cc4-9053-c3926e493514`;

    const getSHA256Hash = (input: string): string => {
      const hash = crypto.createHash('sha256');
      hash.update(input);
      return hash.digest('hex');
    };

    const sh256 = `${getSHA256Hash(makeDataForHash)}###1`;
    // console.log('check values from line ==[]==>', {
    //   bs64: bs64,
    //   makeDataForHash: makeDataForHash,
    //   sh256: sh256,
    // });

    // try {
    //   const { data }: any = await axios.post(`${Payment_url}`, {
    //     request: bs64,
    //     headers: {
    //       'accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       'X-VERIFY': sh256,
    //     },
    //   });
    //   return { data: data };
    // } catch (error) {
    //   console.error('Error:', error);
    //   return error;
    // }

    try {
      const response = await fetch(Payment_url, {
        method: 'POST',
        body: JSON.stringify({
          request: bs64,
        }),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': sh256,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error:', error);
      return { error };
    }
  }
}
