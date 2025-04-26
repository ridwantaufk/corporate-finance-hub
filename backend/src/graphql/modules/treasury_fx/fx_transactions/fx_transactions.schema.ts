import { gql } from "graphql-tag";

const FxTransactionsTypeDefs = gql`
  type FxTransaction {
    fx_transaction_id: Int!
    client_id: Int!
    from_currency: String!
    to_currency: String!
    amount: Float!
    exchange_rate: Float!
    transaction_date: String!
  }

  input FxTransactionInput {
    client_id: Int!
    from_currency: String!
    to_currency: String!
    amount: Float!
    exchange_rate: Float!
  }

  input FxTransactionUpdateInput {
    from_currency: String
    to_currency: String
    amount: Float
    exchange_rate: Float
  }

  extend type Query {
    getAllFxTransactions: [FxTransaction!]!
    getFxTransactionById(fx_transaction_id: Int!): FxTransaction
  }

  extend type Mutation {
    createFxTransaction(input: FxTransactionInput!): FxTransaction
    updateFxTransaction(
      fx_transaction_id: Int!
      input: FxTransactionUpdateInput!
    ): FxTransaction
    deleteFxTransaction(fx_transaction_id: Int!): Boolean
  }
`;

export default FxTransactionsTypeDefs;
