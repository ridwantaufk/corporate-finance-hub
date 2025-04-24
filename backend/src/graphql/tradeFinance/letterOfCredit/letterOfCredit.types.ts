export interface LetterOfCredit {
  lc_id: number;
  client_id: number;
  amount: number;
  issue_date: string;
  expiry_date: string;
  status: "open" | "closed" | "expired";
}

export interface CreateLetterOfCreditInput {
  client_id: number;
  amount: number;
  issue_date: string;
  expiry_date: string;
  status: "open" | "closed" | "expired";
}
