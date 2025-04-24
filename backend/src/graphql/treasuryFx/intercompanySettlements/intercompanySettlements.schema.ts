import { gql } from "graphql-tag";

export const intercompanySettlementTypeDefs = gql`
  type IntercompanySettlement {
    settlement_id: Int!
    sender_company: Int!
    receiver_company: Int!
    amount: Float!
    settlement_date: String!
    status: String!
  }

  input CreateIntercompanySettlementInput {
    sender_company: Int!
    receiver_company: Int!
    amount: Float!
    status: String!
  }

  type Query {
    intercompanySettlements: [IntercompanySettlement!]!
    intercompanySettlement(settlement_id: Int!): IntercompanySettlement
  }

  type Mutation {
    createIntercompanySettlement(
      input: CreateIntercompanySettlementInput!
    ): IntercompanySettlement!
    updateIntercompanySettlement(
      settlement_id: Int!
      input: CreateIntercompanySettlementInput!
    ): IntercompanySettlement!
    deleteIntercompanySettlement(settlement_id: Int!): Boolean!
  }
`;
