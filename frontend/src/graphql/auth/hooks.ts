import { LoginResponse } from "./types";

import { useQuery, useMutation } from "@apollo/client";

import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  OAUTH_LOGIN,
  VERIFY_CAPTCHA,
} from "./mutations";

import { GET_CAPTCHA, GET_USER_BIODATAS_QUERY, ME_QUERY } from "./queries";

export const useGetCaptcha = () => useQuery(GET_CAPTCHA);

export const useVerifyCaptcha = () => useMutation(VERIFY_CAPTCHA);

export const useLoginUser = () =>
  useMutation<{ login: LoginResponse }>(LOGIN_USER);

export const useOauthLogin = () => useMutation(OAUTH_LOGIN);

export const useMe = () => useQuery(ME_QUERY);

export const useGetUserBiodatas = () => useQuery(GET_USER_BIODATAS_QUERY);

export const useCreateUser = () => useMutation(CREATE_USER);

export const useLogoutUser = () => useMutation(LOGOUT_USER);
