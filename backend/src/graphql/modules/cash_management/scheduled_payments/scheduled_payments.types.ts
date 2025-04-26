export interface ScheduledPayment {
  id: number;
  virtual_account_id: number;
  amount: number;
  payment_date: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}
