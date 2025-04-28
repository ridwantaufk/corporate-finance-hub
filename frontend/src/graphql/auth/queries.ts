import { gql } from "@apollo/client";

// --- USERS ---
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      user_id
      username
      password_hash
      email
      phone_number
      role
      is_active
      created_at
      updated_at
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($user_id: Int!) {
    getUser(user_id: $user_id) {
      user_id
      username
      email
      phone_number
      role
      is_active
      created_at
      updated_at
    }
  }
`;

// --- 2FA ---
export const GET_TWO_FACTOR = gql`
  query GetTwoFactorAuth($user_id: Int!) {
    getTwoFactorAuth(user_id: $user_id) {
      id
      user_id
      secret
      is_enabled
      created_at
      updated_at
    }
  }
`;

// --- APPROVAL MATRIX ---
export const GET_APPROVAL_MATRIX_BY_ID = gql`
  query GetApprovalMatrix($id: Int!) {
    getApprovalMatrix(id: $id) {
      id
      role
      approval_level
      approver_role
      created_at
      updated_at
    }
  }
`;

export const GET_APPROVAL_MATRIX_BY_ROLE = gql`
  query GetApprovalMatrixByRole($role: String!) {
    getApprovalMatrixByRole(role: $role) {
      id
      role
      approval_level
      approver_role
      created_at
      updated_at
    }
  }
`;
