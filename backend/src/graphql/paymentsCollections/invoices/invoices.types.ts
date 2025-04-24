export interface Invoice {
  invoice_id: number;
  client_id: number;
  amount: number;
  due_date: string;
  status: string;
}

export interface InvoiceInput {
  client_id: number;
  amount: number;
  due_date: string;
  status: string;
}
