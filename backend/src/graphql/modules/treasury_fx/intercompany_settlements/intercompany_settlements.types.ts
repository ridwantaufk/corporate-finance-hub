export interface IntercompanySettlement {
  settlement_id: number;
  sender_company: number;
  receiver_company: number;
  amount: number;
  settlement_date: string;
  status: string;
}

export interface IntercompanySettlementInput {
  sender_company: number;
  receiver_company: number;
  amount: number;
  status: string;
}

export interface IntercompanySettlementUpdateInput {
  sender_company?: number;
  receiver_company?: number;
  amount?: number;
  status?: string;
}
