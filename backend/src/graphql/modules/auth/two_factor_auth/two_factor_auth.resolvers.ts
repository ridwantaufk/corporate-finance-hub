import {
  getTwoFactorAuthByUserId,
  enableTwoFactorAuth,
  disableTwoFactorAuth,
} from "./two_factor_auth.services";

const TwoFactorAuthResolver = {
  Query: {
    getTwoFactorAuth: (_: any, args: { user_id: number }) =>
      getTwoFactorAuthByUserId(args.user_id),
  },
  Mutation: {
    enableTwoFactorAuth: (_: any, args: { user_id: number }) =>
      enableTwoFactorAuth(args.user_id),
    disableTwoFactorAuth: (_: any, args: { user_id: number }) =>
      disableTwoFactorAuth(args.user_id),
  },
};

export default TwoFactorAuthResolver;
