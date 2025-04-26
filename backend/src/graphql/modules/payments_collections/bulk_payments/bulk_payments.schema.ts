import { gql } from "graphql-tag";

const BulkPaymentTypeDefs = gql`
  type BulkPayment {
    payment_id: Int!
    sender_va_id: Int!
    receiver_va_id: Int!
    total_amount: Float!
    payment_date: String!
    status: String!
  }

  type Query {
    getBulkPayment(payment_id: Int!): BulkPayment
    getAllBulkPayments: [BulkPayment]
  }

  type Mutation {
    createBulkPayment(
      sender_va_id: Int!
      receiver_va_id: Int!
      total_amount: Float!
      status: String!
    ): BulkPayment!
    updateBulkPayment(
      payment_id: Int!
      sender_va_id: Int
      receiver_va_id: Int
      total_amount: Float
      status: String
    ): BulkPayment!
    deleteBulkPayment(payment_id: Int!): Boolean!
  }
`;

export default BulkPaymentTypeDefs;
