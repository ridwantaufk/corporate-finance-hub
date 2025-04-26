export interface AmlCheck {
  check_id: number;
  client_id: number;
  check_date: string;
  result: "clear" | "flagged" | "under_review";
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AmlCheckInput {
  client_id: number;
  check_date: string;
  result: "clear" | "flagged" | "under_review";
  notes?: string | null;
}
