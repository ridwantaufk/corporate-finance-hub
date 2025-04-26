import { gql } from "graphql-tag";

const InvoiceTypeDefs = gql`
  type Invoice {
    invoice_id: Int!
    client_id: Int!
    amount: Float!
    due_date: String!
    status: String!
  }

  type Query {
    getInvoice(invoice_id: Int!): Invoice
    getAllInvoices: [Invoice]
  }

  type Mutation {
    createInvoice(
      client_id: Int!
      amount: Float!
      due_date: String!
      status: String!
    ): Invoice!
    updateInvoice(
      invoice_id: Int!
      amount: Float
      due_date: String
      status: String
    ): Invoice!
    deleteInvoice(invoice_id: Int!): Boolean!
  }
`;

export default InvoiceTypeDefs;
