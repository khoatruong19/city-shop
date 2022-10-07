import axiosClient from './axiosClient';

type ProcessPaymentResponse = {
  message: string;
  client_secret: string;
};

type GetApiKeyResponse = {
  message: string;
  stripeApiKey: string;
};

const paymentApi = {
  processPayment: (params: { amount: number }) =>
    axiosClient.post<ProcessPaymentResponse>(`payment/process`, params),
  getApiKey: () => axiosClient.get<GetApiKeyResponse>(`payment/stripeapikey`),
};

export default paymentApi;
