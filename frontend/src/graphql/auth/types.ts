export interface User {
  user_id: number;
  username: string;
  email: string | null;
  phone_number: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

export interface TwoFactorAuth {
  id: number;
  user_id: number;
  secret: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApprovalMatrix {
  id: number;
  role: string;
  approval_level: number;
  approver_role: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  username: string;
  email?: string;
  password: string;
  role: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  phone_number?: string;
  is_active?: boolean;
}

export interface CreateApprovalMatrixInput {
  role: string;
  approval_level: number;
  approver_role: string;
}

export interface UpdateApprovalMatrixInput {
  role?: string;
  approval_level?: number;
  approver_role?: string;
}
