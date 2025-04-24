import { gql } from "apollo-server-express";

export const bulkPaymentsTypeDefs = gql`
  type BulkPayment {
    payment_id: Int!
    sender_va_id: Int!
    receiver_va_id: Int!
    total_amount: Float!
    payment_date: String!
    status: String!
  }

  input BulkPaymentInput {
    sender_va_id: Int!
    receiver_va_id: Int!
    total_amount: Float!
    status: String!
  }

  extend type Query {
    getBulkPayments: [BulkPayment!]!
    getBulkPaymentById(payment_id: Int!): BulkPayment
  }

  extend type Mutation {
    createBulkPayment(input: BulkPaymentInput!): BulkPayment!
    updateBulkPayment(payment_id: Int!, input: BulkPaymentInput!): BulkPayment!
    deleteBulkPayment(payment_id: Int!): Boolean!
  }
`;
