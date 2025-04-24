export interface UserInput {
  username: string;
  password_hash: string;
  email: string;
  phone_number?: string;
  role: "client" | "admin" | "rm" | "finance_controller";
  is_active?: boolean;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  phone_number?: string;
  role: "client" | "admin" | "rm" | "finance_controller";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
