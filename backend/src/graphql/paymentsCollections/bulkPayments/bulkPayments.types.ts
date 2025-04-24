export interface BulkPayment {
  payment_id: number;
  sender_va_id: number;
  receiver_va_id: number;
  total_amount: number;
  payment_date: string;
  status: string;
}

export interface BulkPaymentInput {
  sender_va_id: number;
  receiver_va_id: number;
  total_amount: number;
  status: string;
}
