import { gql } from "graphql-tag";

const CashPositionTypeDefs = gql`
  type CashPosition {
    id: Int!
    account_id: Int!
    amount: Float!
    currency: String!
    position_date: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getCashPosition(id: Int!): CashPosition
    getAllCashPositions: [CashPosition]
  }

  type Mutation {
    createCashPosition(
      account_id: Int!
      amount: Float!
      currency: String!
      position_date: String!
    ): CashPosition!
    updateCashPosition(
      id: Int!
      account_id: Int
      amount: Float
      currency: String
      position_date: String
    ): CashPosition!
    deleteCashPosition(id: Int!): Boolean!
  }
`;

export default CashPositionTypeDefs;
