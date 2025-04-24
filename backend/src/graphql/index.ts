import { authTypeDefs, authResolvers } from "./auth";
import {
  cashManagementTypeDefs,
  cashManagementResolvers,
} from "./cashManagement";
import {
  paymentsCollectionsTypeDefs,
  paymentsCollectionsResolvers,
} from "./paymentsCollections";
import { tradeFinanceTypeDefs, tradeFinanceResolvers } from "./tradeFinance";
import { treasuryFxTypeDefs, treasuryFxResolvers } from "./treasuryFx";
import { taxComplianceTypeDefs, taxComplianceResolvers } from "./taxCompliance";
import { analyticsTypeDefs, analyticsResolvers } from "./analytics";

export const typeDefs = [
  ...authTypeDefs,
  ...cashManagementTypeDefs,
  ...paymentsCollectionsTypeDefs,
  ...tradeFinanceTypeDefs,
  ...treasuryFxTypeDefs,
  ...taxComplianceTypeDefs,
  ...analyticsTypeDefs,
];

export const resolvers = [
  ...authResolvers,
  ...cashManagementResolvers,
  ...paymentsCollectionsResolvers,
  ...tradeFinanceResolvers,
  ...treasuryFxResolvers,
  ...taxComplianceResolvers,
  ...analyticsResolvers,
];
