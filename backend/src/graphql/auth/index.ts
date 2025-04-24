// USER
import { usersTypeDefs } from "./user/user.schema";
import { usersResolvers } from "./user/user.resolvers";

// TWO FACTOR AUTH
import { twoFactorAuthTypeDefs } from "./twoFactorAuth/twoFactorAuth.schema";
import { twoFactorAuthResolvers } from "./twoFactorAuth/twoFactorAuth.resolvers";

// APPROVAL MATRIX
import { approvalMatrixTypeDefs } from "./approvalMatrix/approvalMatrix.schema";
import { approvalMatrixResolvers } from "./approvalMatrix/approvalMatrix.resolvers";

// Merge semua schema dan resolver
export const authTypeDefs = [
  usersTypeDefs,
  twoFactorAuthTypeDefs,
  approvalMatrixTypeDefs,
];

export const authResolvers = [
  usersResolvers,
  twoFactorAuthResolvers,
  approvalMatrixResolvers,
];
