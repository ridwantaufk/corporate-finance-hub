import { gql } from "apollo-server-express";

export const virtualAccountTypeDefs = gql`
  scalar JSON

  type VirtualAccount {
    va_id: Int!
    user_id: Int!
    account_number: String!
    currency: String!
    balance: Float!
    created_at: String!
    updated_at: String!
  }

  input CreateVirtualAccountInput {
    user_id: Int!
    account_number: String!
    currency: String!
  }

  input UpdateVirtualAccountInput {
    user_id: Int
    account_number: String
    currency: String
  }

  type Query {
    getVirtualAccounts: [VirtualAccount!]!
    getVirtualAccountById(va_id: Int!): VirtualAccount
  }

  type Mutation {
    createVirtualAccount(input: CreateVirtualAccountInput!): VirtualAccount!
    updateVirtualAccount(
      va_id: Int!
      input: UpdateVirtualAccountInput!
    ): VirtualAccount!
    deleteVirtualAccount(va_id: Int!): Boolean!
  }
`;
