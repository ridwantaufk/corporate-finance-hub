export interface EFaktur {
  faktur_id: number;
  client_id: number;
  amount: number;
  tax_rate?: number;
  status: string;
}

export interface CreateEFakturInput {
  client_id: number;
  amount: number;
  tax_rate?: number;
  status: string;
}

export interface UpdateEFakturInput {
  client_id: number;
  amount: number;
  tax_rate?: number;
  status: string;
}
