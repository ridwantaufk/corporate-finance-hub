export interface CashPosition {
  id: number;
  account_id: number;
  amount: number;
  currency: string;
  position_date: Date;
  created_at: Date;
  updated_at: Date;
}
