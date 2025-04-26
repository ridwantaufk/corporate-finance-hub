import { gql } from "graphql-tag";

const CashFlowForecastsTypeDefs = gql`
  type CashFlowForecast {
    id: Int!
    forecast_date: String!
    forecast_amount: Float!
    actual_amount: Float!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getCashFlowForecast(id: Int!): CashFlowForecast
    getAllCashFlowForecasts: [CashFlowForecast]
  }

  type Mutation {
    createCashFlowForecast(
      forecast_date: String!
      forecast_amount: Float!
      actual_amount: Float!
    ): CashFlowForecast!
    updateCashFlowForecast(
      id: Int!
      forecast_date: String
      forecast_amount: Float
      actual_amount: Float
    ): CashFlowForecast!
    deleteCashFlowForecast(id: Int!): Boolean!
  }
`;

export default CashFlowForecastsTypeDefs;
