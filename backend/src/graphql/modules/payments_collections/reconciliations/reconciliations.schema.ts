import { gql } from "graphql-tag";

const ReconciliationTypeDefs = gql`
  type Reconciliation {
    reconciliation_id: Int!
    invoice_id: Int!
    transaction_id: Int!
    amount: Float!
    reconciliation_status: String!
  }

  type Query {
    getReconciliation(reconciliation_id: Int!): Reconciliation
    getAllReconciliations: [Reconciliation]
  }

  type Mutation {
    createReconciliation(
      invoice_id: Int!
      transaction_id: Int!
      amount: Float!
      reconciliation_status: String!
    ): Reconciliation!
    updateReconciliation(
      reconciliation_id: Int!
      amount: Float
      reconciliation_status: String
    ): Reconciliation!
    deleteReconciliation(reconciliation_id: Int!): Boolean!
  }
`;

export default ReconciliationTypeDefs;
