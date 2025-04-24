import { gql } from "apollo-server-express";

export const transactionRiskScoresTypeDefs = gql`
  scalar JSON

  scalar JSON

  type TransactionRiskScore {
    risk_id: Int!
    transaction_id: Int!
    risk_score: Float!
    status: String!
  }

  input CreateTransactionRiskScoreInput {
    transaction_id: Int!
    risk_score: Float!
    status: String!
  }

  input UpdateTransactionRiskScoreInput {
    risk_score: Float
    status: String
  }

  type Query {
    getTransactionRiskScores: [TransactionRiskScore]
    getTransactionRiskScoreById(risk_id: Int!): TransactionRiskScore
  }

  type Mutation {
    createTransactionRiskScore(
      input: CreateTransactionRiskScoreInput!
    ): TransactionRiskScore
    updateTransactionRiskScore(
      risk_id: Int!
      input: UpdateTransactionRiskScoreInput!
    ): TransactionRiskScore
    deleteTransactionRiskScore(risk_id: Int!): Boolean
  }
`;
