import { gql } from "graphql-tag";

const ScheduledPaymentTypeDefs = gql`
  type ScheduledPayment {
    id: Int!
    virtual_account_id: Int!
    amount: Float!
    payment_date: String!
    status: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getScheduledPayment(id: Int!): ScheduledPayment
    getAllScheduledPayments: [ScheduledPayment]
  }

  type Mutation {
    createScheduledPayment(
      virtual_account_id: Int!
      amount: Float!
      payment_date: String!
      status: String!
    ): ScheduledPayment!
    updateScheduledPayment(
      id: Int!
      amount: Float
      payment_date: String
      status: String
    ): ScheduledPayment!
    deleteScheduledPayment(id: Int!): Boolean!
  }
`;

export default ScheduledPaymentTypeDefs;
