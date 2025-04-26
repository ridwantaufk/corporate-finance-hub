import { gql } from "graphql-tag";

const TwoFactorAuthTypeDefs = gql`
  type TwoFactorAuth {
    id: Int!
    user_id: Int!
    secret: String!
    is_enabled: Boolean!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getTwoFactorAuth(user_id: Int!): TwoFactorAuth
  }

  type Mutation {
    enableTwoFactorAuth(user_id: Int!): TwoFactorAuth!
    disableTwoFactorAuth(user_id: Int!): Boolean!
  }
`;

export default TwoFactorAuthTypeDefs;
