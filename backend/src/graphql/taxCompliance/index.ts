// Mengimpor schema dan resolvers dari masing-masing modul
import { eFakturTypeDefs } from "./eFaktur/eFaktur.schema";
import { eFakturResolvers } from "./eFaktur/eFaktur.resolvers";

import { regulatoryReportsTypeDefs } from "./regulatoryReports/regulatoryReports.schema";
import { regulatoryReportsResolvers } from "./regulatoryReports/regulatoryReports.resolvers";

import { amlChecksTypeDefs } from "./amlChecks/amlChecks.schema";
import { amlCheckResolvers } from "./amlChecks/amlChecks.resolvers";

// Gabungkan typeDefs dan resolvers untuk Tax Compliance
export const taxComplianceTypeDefs = [
  eFakturTypeDefs,
  regulatoryReportsTypeDefs,
  amlChecksTypeDefs,
];

export const taxComplianceResolvers = [
  eFakturResolvers,
  regulatoryReportsResolvers,
  amlCheckResolvers,
];
