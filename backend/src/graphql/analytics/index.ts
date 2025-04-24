// Import semua typeDefs & resolvers dari masing-masing modul
import { cashFlowForecastsTypeDefs } from "./cashFlowForecasts/cashFlowForecasts.schema";
import { cashFlowForecastResolvers } from "./cashFlowForecasts/cashFlowForecasts.resolvers";

import { transactionRiskScoresTypeDefs } from "./transactionRiskScores/transactionRiskScores.schema";
import { transactionRiskScoreResolvers } from "./transactionRiskScores/transactionRiskScores.resolvers";

import { transactionHeatmapTypeDefs } from "./transactionHeatmap/transactionHeatmap.schema";
import { transactionHeatmapResolvers } from "./transactionHeatmap/transactionHeatmap.resolvers";

// Gabungkan semua typeDefs & resolvers untuk modul analytics
export const analyticsTypeDefs = [
  cashFlowForecastsTypeDefs,
  transactionRiskScoresTypeDefs,
  transactionHeatmapTypeDefs,
];

export const analyticsResolvers = [
  cashFlowForecastResolvers,
  transactionRiskScoreResolvers,
  transactionHeatmapResolvers,
];
