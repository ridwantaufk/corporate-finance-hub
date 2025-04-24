import { gql } from "apollo-server-express";

export const twoFactorAuthTypeDefs = gql`
  type TwoFactorAuth {
    user_id: ID!
    secret_key: String!
    is_enabled: Boolean!
    created_at: String!
    updated_at: String!
  }

  input TwoFactorAuthInput {
    secret_key: String!
    is_enabled: Boolean
  }

  type Query {
    getTwoFactorAuth(user_id: ID!): TwoFactorAuth
  }

  type Mutation {
    enableTwoFactorAuth(
      user_id: ID!
      input: TwoFactorAuthInput!
    ): TwoFactorAuth!
    disableTwoFactorAuth(user_id: ID!): Boolean!
  }
`;
