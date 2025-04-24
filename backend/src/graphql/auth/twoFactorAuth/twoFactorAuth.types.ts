export interface TwoFactorAuthInput {
  user_id: number;
  secret_key: string;
  is_enabled?: boolean;
}

export interface TwoFactorAuth {
  user_id: number;
  secret_key: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}
