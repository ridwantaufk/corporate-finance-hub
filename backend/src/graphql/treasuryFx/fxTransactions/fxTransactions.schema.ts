import { gql } from "graphql-tag";

export const fxTransactionTypeDefs = gql`
  scalar JSON

  type FxTransaction {
    fx_transaction_id: Int!
    client_id: Int!
    from_currency: String!
    to_currency: String!
    amount: Float!
    exchange_rate: Float!
    transaction_date: String!
  }

  input CreateFxTransactionInput {
    client_id: Int!
    from_currency: String!
    to_currency: String!
    amount: Float!
    exchange_rate: Float!
  }

  type Query {
    fxTransactions: [FxTransaction!]!
    fxTransaction(fx_transaction_id: Int!): FxTransaction
  }

  type Mutation {
    createFxTransaction(input: CreateFxTransactionInput!): FxTransaction!
    deleteFxTransaction(fx_transaction_id: Int!): Boolean!
  }
`;
