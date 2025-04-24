import { gql } from "apollo-server-express";

export const transactionHeatmapTypeDefs = gql`
  scalar JSON

  type TransactionHeatmap {
    heatmap_id: Int!
    date: String!
    hour: Int!
    transaction_count: Int!
  }

  input CreateTransactionHeatmapInput {
    date: String!
    hour: Int!
    transaction_count: Int!
  }

  input UpdateTransactionHeatmapInput {
    date: String
    hour: Int
    transaction_count: Int
  }

  type Query {
    getTransactionHeatmaps: [TransactionHeatmap]
    getTransactionHeatmapById(heatmap_id: Int!): TransactionHeatmap
  }

  type Mutation {
    createTransactionHeatmap(
      input: CreateTransactionHeatmapInput!
    ): TransactionHeatmap
    updateTransactionHeatmap(
      heatmap_id: Int!
      input: UpdateTransactionHeatmapInput!
    ): TransactionHeatmap
    deleteTransactionHeatmap(heatmap_id: Int!): Boolean
  }
`;
