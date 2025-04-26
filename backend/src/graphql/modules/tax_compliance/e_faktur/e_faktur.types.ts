export interface EFaktur {
  faktur_id: number;
  client_id: number;
  faktur_number: string;
  faktur_date: string;
  total_amount: string;
  tax_amount: string;
  status: "submitted" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

export interface EFakturInput {
  client_id: number;
  faktur_number: string;
  faktur_date: string;
  total_amount: string;
  tax_amount: string;
  status: "submitted" | "approved" | "rejected";
}
