export interface IntercompanySettlement {
  settlement_id: number;
  sender_company: number;
  receiver_company: number;
  amount: number;
  settlement_date: string;
  status: "pending" | "completed" | "failed";
}

export interface CreateIntercompanySettlementInput {
  sender_company: number;
  receiver_company: number;
  amount: number;
  status: "pending" | "completed" | "failed";
}
