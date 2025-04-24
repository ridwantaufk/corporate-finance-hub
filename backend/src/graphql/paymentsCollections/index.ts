// Mengimpor schema dan resolvers dari masing-masing modul
import { bulkPaymentsTypeDefs } from "./bulkPayments/bulkPayments.schema";
import { bulkPaymentsResolvers } from "./bulkPayments/bulkPayments.resolvers";

import { invoicesTypeDefs } from "./invoices/invoices.schema";
import { invoicesResolvers } from "./invoices/invoices.resolvers";

import { reconciliationTypeDefs } from "./reconciliations/reconciliations.schema";
import { reconciliationResolvers } from "./reconciliations/reconciliations.resolvers";

// Gabungkan typeDefs dan resolvers untuk Payments & Collections
export const paymentsCollectionsTypeDefs = [
  bulkPaymentsTypeDefs,
  invoicesTypeDefs,
  reconciliationTypeDefs,
];

export const paymentsCollectionsResolvers = [
  bulkPaymentsResolvers,
  invoicesResolvers,
  reconciliationResolvers,
];
