import { gql } from "apollo-server-express";

export const reconciliationTypeDefs = gql`
  type Reconciliation {
    reconciliation_id: Int!
    invoice_id: Int!
    transaction_id: Int!
    amount: Float!
    reconciliation_status: String!
  }

  input ReconciliationInput {
    invoice_id: Int!
    transaction_id: Int!
    amount: Float!
    reconciliation_status: String!
  }

  type Query {
    getReconciliations: [Reconciliation!]!
    getReconciliationById(reconciliation_id: Int!): Reconciliation
  }

  type Mutation {
    createReconciliation(input: ReconciliationInput!): Reconciliation!
    updateReconciliation(
      reconciliation_id: Int!
      input: ReconciliationInput!
    ): Reconciliation!
    deleteReconciliation(reconciliation_id: Int!): Boolean!
  }
`;
