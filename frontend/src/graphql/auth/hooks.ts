import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USERS,
  GET_USER_BY_ID,
  GET_TWO_FACTOR,
  GET_APPROVAL_MATRIX_BY_ID,
  GET_APPROVAL_MATRIX_BY_ROLE,
} from "./queries";

import {
  LOGIN_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  ENABLE_TWO_FACTOR,
  DISABLE_TWO_FACTOR,
  CREATE_APPROVAL_MATRIX,
  UPDATE_APPROVAL_MATRIX,
  DELETE_APPROVAL_MATRIX,
} from "./mutations";

// --- USERS ---
export const useGetUsers = () => useQuery(GET_USERS);
export const useGetUserById = (userId: number) =>
  useQuery(GET_USER_BY_ID, { variables: { user_id: userId } });

export const useLoginUser = () => useMutation(LOGIN_USER);
export const useCreateUser = () => useMutation(CREATE_USER);
export const useUpdateUser = () => useMutation(UPDATE_USER);
export const useDeleteUser = () => useMutation(DELETE_USER);

// --- 2FA ---
export const useGetTwoFactor = (userId: number) =>
  useQuery(GET_TWO_FACTOR, { variables: { user_id: userId } });

export const useEnableTwoFactor = () => useMutation(ENABLE_TWO_FACTOR);
export const useDisableTwoFactor = () => useMutation(DISABLE_TWO_FACTOR);

// --- APPROVAL MATRIX ---
export const useGetApprovalMatrixById = (id: number) =>
  useQuery(GET_APPROVAL_MATRIX_BY_ID, { variables: { id } });

export const useGetApprovalMatrixByRole = (role: string) =>
  useQuery(GET_APPROVAL_MATRIX_BY_ROLE, { variables: { role } });

export const useCreateApprovalMatrix = () =>
  useMutation(CREATE_APPROVAL_MATRIX);

export const useUpdateApprovalMatrix = () =>
  useMutation(UPDATE_APPROVAL_MATRIX);

export const useDeleteApprovalMatrix = () =>
  useMutation(DELETE_APPROVAL_MATRIX);
