import { gql } from "apollo-server-express";

export const scheduledPaymentTypeDefs = gql`
  type ScheduledPayment {
    payment_id: Int!
    va_id: Int!
    amount: Float!
    due_date: String!
    status: String!
  }

  input ScheduledPaymentInput {
    va_id: Int!
    amount: Float!
    due_date: String!
    status: String!
  }

  type Query {
    getScheduledPayments: [ScheduledPayment!]!
  }

  type Mutation {
    createScheduledPayment(input: ScheduledPaymentInput!): ScheduledPayment!
    updateScheduledPayment(
      payment_id: Int!
      input: ScheduledPaymentInput!
    ): ScheduledPayment!
    deleteScheduledPayment(payment_id: Int!): Boolean!
  }
`;
