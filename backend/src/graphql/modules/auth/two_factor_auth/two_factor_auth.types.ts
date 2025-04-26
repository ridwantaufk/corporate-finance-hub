export interface TwoFactorAuth {
  id: number;
  user_id: number;
  secret: string;
  is_enabled: boolean;
  created_at: Date;
  updated_at: Date;
}
