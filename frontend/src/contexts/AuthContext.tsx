"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useLoginUser, useMe, useLogoutUser } from "@/graphql/auth/hooks";
import client from "@/lib/apolloClient";
import { LoginResponse } from "@/graphql/auth/types";
import { ApolloError } from "@apollo/client";

interface UserBiodata {
  user_id: string;
  username: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  biodata?: {
    biodata_id: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    gender?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    nationality?: string;
    marital_status?: string;
    occupation?: string;
    profile_picture?: string;
  };
}

interface AuthContextType {
  userBiodata: UserBiodata | null;
  isMeLoading: any;
  isLoginLoading: any;
  loginError: ApolloError | undefined;
  isLogoutLoading: any;
  meError: ApolloError | undefined;
  login: (
    username: string,
    password: string,
    captchaResponse: any
  ) => Promise<void>;
  logout: () => void;
  statusLogin: LoginResponse | null;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userBiodata, setUserBiodata] = useState<UserBiodata | null>(null);
  const [statusLogin, setStatusLogin] = useState<LoginResponse | null>(null);

  const [loginUser, { loading: isLoginLoading, error: loginError }] =
    useLoginUser();

  const { data: meData, loading: isMeLoading, error: meError } = useMe();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // console.log("statusLogin : ", statusLogin);
  }, [statusLogin]);

  const [logoutUser, { loading: isLogoutLoading }] = useLogoutUser();

  useEffect(() => {
    if (meData?.me) {
      // console.log("data : ", meData.me);
      setUserBiodata(meData.me);
    }
  }, [meData]);

  const login = async (
    username: string,
    password: string,
    captchaResponse: any
  ) => {
    try {
      const { data, errors } = await loginUser({
        variables: { username, password, captchaResponse },
      });
      if (data?.login && data?.login?.success && data?.login?.message !== "") {
        setStatusLogin(data?.login);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("error : ", error);
    }
  };

  const logout = async () => {
    await client.clearStore();
    setIsLoggingOut(true);
    await logoutUser();
    window.location.href = "/auth/login";
    setUserBiodata(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginLoading,
        loginError,
        userBiodata,
        isMeLoading,
        meError,
        isLogoutLoading,
        login,
        statusLogin,
        isLoggingOut,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext harus digunakan dalam AuthProvider");
  }
  return context;
};
