import { gql } from "apollo-server-express";

export const cashFlowForecastsTypeDefs = gql`
  type CashFlowForecast {
    forecast_id: Int!
    client_id: Int!
    forecast_date: String!
    forecast_amount: Float!
    actual_amount: Float
    forecast_accuracy: Float
  }

  input CreateCashFlowForecastInput {
    client_id: Int!
    forecast_date: String!
    forecast_amount: Float!
    actual_amount: Float
    forecast_accuracy: Float
  }

  input UpdateCashFlowForecastInput {
    client_id: Int
    forecast_date: String
    forecast_amount: Float
    actual_amount: Float
    forecast_accuracy: Float
  }

  type Query {
    getCashFlowForecasts: [CashFlowForecast]
    getCashFlowForecastById(forecast_id: Int!): CashFlowForecast
  }

  type Mutation {
    createCashFlowForecast(
      input: CreateCashFlowForecastInput!
    ): CashFlowForecast
    updateCashFlowForecast(
      forecast_id: Int!
      input: UpdateCashFlowForecastInput!
    ): CashFlowForecast
    deleteCashFlowForecast(forecast_id: Int!): Boolean
  }
`;
