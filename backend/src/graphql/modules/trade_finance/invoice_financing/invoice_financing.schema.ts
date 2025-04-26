import { gql } from "graphql-tag";

const InvoiceFinancingTypeDefs = gql`
  type InvoiceFinancing {
    invoice_id: Int!
    client_id: Int!
    amount: Float!
    financing_status: String!
    created_at: String!
  }

  input InvoiceFinancingInput {
    client_id: Int!
    amount: Float!
    financing_status: String!
  }

  input InvoiceFinancingUpdateInput {
    amount: Float
    financing_status: String
  }

  extend type Query {
    getAllInvoiceFinancings: [InvoiceFinancing!]!
    getInvoiceFinancingById(invoice_id: Int!): InvoiceFinancing
  }

  extend type Mutation {
    createInvoiceFinancing(input: InvoiceFinancingInput!): InvoiceFinancing
    updateInvoiceFinancing(
      invoice_id: Int!
      input: InvoiceFinancingUpdateInput!
    ): InvoiceFinancing
    deleteInvoiceFinancing(invoice_id: Int!): Boolean
  }
`;

export default InvoiceFinancingTypeDefs;
