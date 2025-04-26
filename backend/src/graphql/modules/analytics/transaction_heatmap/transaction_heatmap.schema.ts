import { gql } from "graphql-tag";

const TransactionHeatmapTypeDefs = gql`
  type TransactionHeatmap {
    id: Int!
    transaction_time: String!
    heatmap_value: Float!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getTransactionHeatmap(id: Int!): TransactionHeatmap
    getAllTransactionHeatmaps: [TransactionHeatmap]
  }

  type Mutation {
    createTransactionHeatmap(
      transaction_time: String!
      heatmap_value: Float!
    ): TransactionHeatmap!
    updateTransactionHeatmap(
      id: Int!
      transaction_time: String
      heatmap_value: Float
    ): TransactionHeatmap!
    deleteTransactionHeatmap(id: Int!): Boolean!
  }
`;

export default TransactionHeatmapTypeDefs;
