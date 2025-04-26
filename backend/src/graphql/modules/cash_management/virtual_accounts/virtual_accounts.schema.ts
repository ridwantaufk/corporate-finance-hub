import { gql } from "graphql-tag";

const VirtualAccountTypeDefs = gql`
  type VirtualAccount {
    id: Int!
    account_number: String!
    balance: Float!
    currency: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getVirtualAccount(id: Int!): VirtualAccount
    getAllVirtualAccounts: [VirtualAccount]
  }

  type Mutation {
    createVirtualAccount(
      account_number: String!
      balance: Float!
      currency: String!
    ): VirtualAccount!
    updateVirtualAccount(
      id: Int!
      account_number: String
      balance: Float
      currency: String
    ): VirtualAccount!
    deleteVirtualAccount(id: Int!): Boolean!
  }
`;

export default VirtualAccountTypeDefs;
