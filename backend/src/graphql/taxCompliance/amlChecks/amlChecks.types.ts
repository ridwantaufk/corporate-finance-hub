export interface AMLCheck {
  check_id: number;
  client_id: number;
  transaction_id: number;
  status: string;
}

export interface CreateAMLCheckInput {
  client_id: number;
  transaction_id: number;
  status: string;
}

export interface UpdateAMLCheckInput {
  client_id?: number;
  transaction_id?: number;
  status?: string;
}
