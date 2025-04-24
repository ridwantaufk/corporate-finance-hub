import { importExportTrackingTypeDefs } from "./importExportTracking/importExportTracking.schema";
import { importExportTrackingResolvers } from "./importExportTracking/importExportTracking.resolvers";

import { invoiceFinancingTypeDefs } from "./invoiceFinancing/invoiceFinancing.schema";
import { invoiceFinancingResolvers } from "./invoiceFinancing/invoiceFinancing.resolvers";

import { letterOfCreditTypeDefs } from "./letterOfCredit/letterOfCredit.schema";
import { letterOfCreditResolvers } from "./letterOfCredit/letterOfCredit.resolvers";

export const tradeFinanceTypeDefs = [
  letterOfCreditTypeDefs,
  invoiceFinancingTypeDefs,
  importExportTrackingTypeDefs,
];

export const tradeFinanceResolvers = [
  letterOfCreditResolvers,
  invoiceFinancingResolvers,
  importExportTrackingResolvers,
];
