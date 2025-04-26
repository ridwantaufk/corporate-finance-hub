export interface User {
  user_id: number;
  username: string;
  password_hash: string;
  email?: string;
  phone_number?: string;
  role: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
