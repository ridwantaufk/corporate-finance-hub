export interface Invoice {
  invoice_id: number;
  client_id: number;
  amount: number;
  due_date: Date;
  status: string;
}
