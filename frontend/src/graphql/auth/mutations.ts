import { gql } from "@apollo/client";

// --- LOGIN ---
export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;

// --- USERS ---
export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String
    $password: String!
    $role: String!
    $phone_number: String
    $is_active: Boolean
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      role: $role
      phone_number: $phone_number
      is_active: $is_active
    ) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $user_id: Int!
    $username: String
    $email: String
    $password: String
    $role: String
    $phone_number: String
    $is_active: Boolean
  ) {
    updateUser(
      user_id: $user_id
      username: $username
      email: $email
      password: $password
      role: $role
      phone_number: $phone_number
      is_active: $is_active
    ) {
      user_id
      username
      email
      role
      phone_number
      is_active
      created_at
      updated_at
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($user_id: Int!) {
    deleteUser(user_id: $user_id)
  }
`;

// --- 2FA ---
export const ENABLE_TWO_FACTOR = gql`
  mutation EnableTwoFactorAuth($user_id: Int!) {
    enableTwoFactorAuth(user_id: $user_id) {
      id
      user_id
      secret
      is_enabled
      created_at
      updated_at
    }
  }
`;

export const DISABLE_TWO_FACTOR = gql`
  mutation DisableTwoFactorAuth($user_id: Int!) {
    disableTwoFactorAuth(user_id: $user_id)
  }
`;

// --- APPROVAL MATRIX ---
export const CREATE_APPROVAL_MATRIX = gql`
  mutation CreateApprovalMatrix(
    $role: String!
    $approval_level: Int!
    $approver_role: String!
  ) {
    createApprovalMatrix(
      role: $role
      approval_level: $approval_level
      approver_role: $approver_role
    ) {
      id
      role
      approval_level
      approver_role
      created_at
      updated_at
    }
  }
`;

export const UPDATE_APPROVAL_MATRIX = gql`
  mutation UpdateApprovalMatrix(
    $id: Int!
    $role: String
    $approval_level: Int
    $approver_role: String
  ) {
    updateApprovalMatrix(
      id: $id
      role: $role
      approval_level: $approval_level
      approver_role: $approver_role
    ) {
      id
      role
      approval_level
      approver_role
      created_at
      updated_at
    }
  }
`;

export const DELETE_APPROVAL_MATRIX = gql`
  mutation DeleteApprovalMatrix($id: Int!) {
    deleteApprovalMatrix(id: $id)
  }
`;
