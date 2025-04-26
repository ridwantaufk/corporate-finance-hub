import { gql } from "graphql-tag";

const TransactionRiskScoresTypeDefs = gql`
  type TransactionRiskScore {
    id: Int!
    transaction_id: Int!
    risk_score: Float!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getTransactionRiskScore(id: Int!): TransactionRiskScore
    getAllTransactionRiskScores: [TransactionRiskScore]
  }

  type Mutation {
    createTransactionRiskScore(
      transaction_id: Int!
      risk_score: Float!
    ): TransactionRiskScore!
    updateTransactionRiskScore(
      id: Int!
      transaction_id: Int
      risk_score: Float
    ): TransactionRiskScore!
    deleteTransactionRiskScore(id: Int!): Boolean!
  }
`;

export default TransactionRiskScoresTypeDefs;
