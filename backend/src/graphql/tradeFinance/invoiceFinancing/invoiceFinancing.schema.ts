import { gql } from "graphql-tag";

export const invoiceFinancingTypeDefs = gql`
  type InvoiceFinancing {
    invoice_id: ID!
    client_id: Int!
    amount: Float!
    financing_status: String!
    created_at: String!
  }

  input CreateInvoiceFinancingInput {
    client_id: Int!
    amount: Float!
    financing_status: String!
  }

  type Query {
    getInvoiceFinancings: [InvoiceFinancing!]!
    getInvoiceFinancingById(id: ID!): InvoiceFinancing
  }

  type Mutation {
    createInvoiceFinancing(
      input: CreateInvoiceFinancingInput!
    ): InvoiceFinancing!
    updateInvoiceFinancing(
      id: ID!
      input: CreateInvoiceFinancingInput!
    ): InvoiceFinancing!
    deleteInvoiceFinancing(id: ID!): Boolean!
  }
`;
