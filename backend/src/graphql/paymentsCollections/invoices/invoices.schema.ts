import { gql } from "apollo-server-express";

export const invoicesTypeDefs = gql`
  scalar JSON

  type Invoice {
    invoice_id: Int!
    client_id: Int!
    amount: Float!
    due_date: String!
    status: String!
  }

  input InvoiceInput {
    client_id: Int!
    amount: Float!
    due_date: String!
    status: String!
  }

  extend type Query {
    getInvoices: [Invoice!]!
    getInvoiceById(invoice_id: Int!): Invoice
  }

  extend type Mutation {
    createInvoice(input: InvoiceInput!): Invoice!
    updateInvoice(invoice_id: Int!, input: InvoiceInput!): Invoice!
    deleteInvoice(invoice_id: Int!): Boolean!
  }
`;
