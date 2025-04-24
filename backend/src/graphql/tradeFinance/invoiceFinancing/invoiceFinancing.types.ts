export interface InvoiceFinancing {
  invoice_id: number;
  client_id: number;
  amount: number;
  financing_status: "approved" | "pending" | "rejected";
  created_at: string;
}

export interface CreateInvoiceFinancingInput {
  client_id: number;
  amount: number;
  financing_status: "approved" | "pending" | "rejected";
}
