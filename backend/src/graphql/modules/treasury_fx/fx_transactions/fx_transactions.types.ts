export interface FxTransaction {
  fx_transaction_id: number;
  client_id: number;
  from_currency: string;
  to_currency: string;
  amount: number;
  exchange_rate: number;
  transaction_date: string;
}

export interface FxTransactionInput {
  client_id: number;
  from_currency: string;
  to_currency: string;
  amount: number;
  exchange_rate: number;
}

export interface FxTransactionUpdateInput {
  from_currency?: string;
  to_currency?: string;
  amount?: number;
  exchange_rate?: number;
}
