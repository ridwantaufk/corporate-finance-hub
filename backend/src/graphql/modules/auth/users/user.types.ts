import {
  Biodata,
  CreateBiodata,
  UpdateBiodata,
  getBiodataWithId,
} from "@/graphql/modules/auth/biodata/biodata.types";

export interface User {
  username: string;
  password: string;
  password_hash: string;
  role: string;
  is_active: boolean;
  biodata_id: string;
  verified_email: string;
  updated_at: Date;
  created_at: Date;
}

export interface LoginResultUser extends Omit<User, "password_hash"> {
  user_id: string;
}

export interface LoginResult {
  accessToken: string;
  user: LoginResultUser;
}

export interface getUserWithId extends User {
  user_id: string;
}

export interface getUserBiodata extends getUserWithId {
  biodata: getBiodataWithId;
}

export interface CreateUserBiodata extends User {
  biodata: CreateBiodata;
}

export interface UpdateUserBiodata extends Partial<User> {
  user_id: string;
  biodata: UpdateBiodata;
}
