// src/graphql/treasuryFx/index.ts

import { fxTransactionTypeDefs } from "./fxTransactions/fxTransactions.schema";
import { fxTransactionResolvers } from "./fxTransactions/fxTransactions.resolvers";

import { intercompanySettlementTypeDefs } from "./intercompanySettlements/intercompanySettlements.schema";
import { intercompanySettlementResolvers } from "./intercompanySettlements/intercompanySettlements.resolvers";

export const treasuryFxTypeDefs = [
  fxTransactionTypeDefs,
  intercompanySettlementTypeDefs,
];

export const treasuryFxResolvers = [
  fxTransactionResolvers,
  intercompanySettlementResolvers,
];
