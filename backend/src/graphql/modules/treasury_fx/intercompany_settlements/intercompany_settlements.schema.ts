import { gql } from "graphql-tag";

const IntercompanySettlementsTypeDefs = gql`
  type IntercompanySettlement {
    settlement_id: Int!
    sender_company: Int!
    receiver_company: Int!
    amount: Float!
    settlement_date: String!
    status: String!
  }

  input IntercompanySettlementInput {
    sender_company: Int!
    receiver_company: Int!
    amount: Float!
    status: String!
  }

  input IntercompanySettlementUpdateInput {
    sender_company: Int
    receiver_company: Int
    amount: Float
    status: String
  }

  extend type Query {
    getAllIntercompanySettlements: [IntercompanySettlement!]!
    getIntercompanySettlementById(settlement_id: Int!): IntercompanySettlement
  }

  extend type Mutation {
    createIntercompanySettlement(
      input: IntercompanySettlementInput!
    ): IntercompanySettlement
    updateIntercompanySettlement(
      settlement_id: Int!
      input: IntercompanySettlementUpdateInput!
    ): IntercompanySettlement
    deleteIntercompanySettlement(settlement_id: Int!): Boolean
  }
`;
export default IntercompanySettlementsTypeDefs;
