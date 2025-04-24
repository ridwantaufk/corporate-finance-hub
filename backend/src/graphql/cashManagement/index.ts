// Mengimpor schema dan resolvers dari masing-masing modul
import { virtualAccountTypeDefs } from "./virtualAccount/virtualAccount.schema";
import { virtualAccountResolvers } from "./virtualAccount/virtualAccount.resolvers";

import { cashPositionTypeDefs } from "./cashPosition/cashPosition.schema";
import { cashPositionResolvers } from "./cashPosition/cashPosition.resolvers";

import { scheduledPaymentTypeDefs } from "./scheduledPayment/scheduledPayment.schema";
import { scheduledPaymentResolvers } from "./scheduledPayment/scheduledPayment.resolvers";

// Gabungkan typeDefs dan resolvers untuk Cash Management
export const cashManagementTypeDefs = [
  virtualAccountTypeDefs,
  cashPositionTypeDefs,
  scheduledPaymentTypeDefs,
];

export const cashManagementResolvers = [
  virtualAccountResolvers,
  cashPositionResolvers,
  scheduledPaymentResolvers,
];
