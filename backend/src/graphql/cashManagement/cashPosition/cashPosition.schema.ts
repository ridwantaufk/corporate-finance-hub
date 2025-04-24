import { gql } from "apollo-server-express";

export const cashPositionTypeDefs = gql`
  scalar JSON

  type CashPosition {
    position_id: Int!
    va_id: Int!
    transaction_date: String!
    amount: Float!
    transaction_type: String!
    balance_after: Float!
  }

  input CashPositionInput {
    va_id: Int!
    amount: Float!
    transaction_type: String!
    balance_after: Float!
  }

  type Query {
    getCashPositions: [CashPosition!]!
  }

  type Mutation {
    createCashPosition(input: CashPositionInput!): CashPosition!
    updateCashPosition(
      position_id: Int!
      input: CashPositionInput!
    ): CashPosition!
    deleteCashPosition(position_id: Int!): Boolean!
  }
`;
