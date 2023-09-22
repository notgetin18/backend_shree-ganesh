import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios from 'axios';

@Injectable()
export class PaymentService {
  async create(paymentData: CreatePaymentDto) {
    console.log('paymentData ==>', paymentData['txnid']);
    const paymentDetail = {
      order_id: paymentData.txnid,
      order_amount: paymentData.amount,
      order_currency: 'INR',
      order_note: paymentData.productinfo,
      customer_details: {
        customer_id: paymentData.customerId,
        customer_email: paymentData.email,
        customer_phone: paymentData.phone,
      },
    };

    switch (paymentData['data']) {
      case 'upi':
        const CreatOrderData: any = await axios.post(
          `https://sandbox.cashfree.com/pg/orders`,
          {
            ...paymentDetail,
            order_meta: {
              // payment_methods:"upi",
              return_url: `http://localhost:3000/`,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-version': '2022-09-01',
              'x-client-id': '169936ca2822c07ae74caf7114639961',
              'x-client-secret': 'TEST482124403caf1324d71bb25e3c4d28eab88b1a31',
            },
          },
        );
        try {
          const { data }: any = await axios.post(
            `https://sandbox.cashfree.com/pg/orders/sessions`,
            {
              payment_session_id: CreatOrderData.data.payment_session_id,
              payment_method: {
                upi: {
                  channel: 'qrcode',
                },
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-api-version': '2022-09-01',
                'x-client-id': '169936ca2822c07ae74caf7114639961',
                'x-client-secret':
                  'TEST482124403caf1324d71bb25e3c4d28eab88b1a31',
              },
            },
          );
          return { isError: false, data };
        } catch (error) {
          console.log(error);
          return { isError: true, message: 'api fat gayi' };
        }

      default:
        break;
    }

    // switch (paymentData['data']) {
    //   case 'now':
    //     try {
    //       const { data }: any = await axios.post(
    //         `https://sandbox.cashfree.com/pg/orders`,
    //         {
    //           ...paymentDetail,
    //           order_meta: {
    //             // payment_methods:"upi",
    //             return_url: `http://localhost:3000/`,
    //             notify_url:
    //               'https://mail.google.com/mail/u/0/?tab=rm&ogbl#chat/dm/tSa7PEAAAAE',
    //           },
    //         },
    //         {
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'x-api-version': '2022-01-01',
    //             'x-client-id': '169936ca2822c07ae74caf7114639961',
    //             'x-client-secret':
    //               'TEST482124403caf1324d71bb25e3c4d28eab88b1a31',
    //           },
    //         },
    //       );
    //       console.log(data);
    //       return { isError: false, data };
    //     } catch (error) {
    //       console.log(error);
    //       return { isError: true, message: 'api fat gayi' };
    //     }
    //     break;
    //   case 'upi':
    //     try {
    //       const { data }: any = await axios.post(
    //         `https://sandbox.cashfree.com/pg/orders`,
    //         {
    //           ...paymentDetail,
    //           order_meta: {
    //             payment_methods: {
    //               type: 'String',
    //               upi: {
    //                 channel: 'qrcode',
    //               },
    //             },
    //             return_url: `http://localhost:3000/`,
    //             notify_url:
    //               'https://mail.google.com/mail/u/0/?tab=rm&ogbl#chat/dm/tSa7PEAAAAE',
    //           },
    //         },
    //         {
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'x-api-version': '2022-09-01',
    //             'x-client-id': '169936ca2822c07ae74caf7114639961',
    //             'x-client-secret':
    //               'TEST482124403caf1324d71bb25e3c4d28eab88b1a31',
    //           },
    //         },
    //       );
    //       console.log(data);
    //       return { isError: false, data };
    //     } catch (error) {
    //       console.log(error);
    //       return { isError: true, message: 'api fat gayi' };
    //     }

    //     break;
    //   default:
    //     break;
    // }
  }
}
