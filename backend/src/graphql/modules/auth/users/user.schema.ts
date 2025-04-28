import { gql } from "graphql-tag";

const UserTypeDefs = gql`
  type User {
    user_id: Int!
    username: String!
    email: String
    phone_number: String
    role: String!
    is_active: Boolean!
    created_at: String!
    updated_at: String!
  }

  type LoginResponse {
    accessToken: String!
  }

  type Query {
    getUsers: [User!]!
    getUser(user_id: Int!): User
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse!

    createUser(
      username: String!
      email: String
      password: String!
      role: String!
      phone_number: String
      is_active: Boolean
    ): User!

    updateUser(
      user_id: Int!
      username: String
      email: String
      password: String
      role: String
      phone_number: String
      is_active: Boolean
    ): User!

    deleteUser(user_id: Int!): Boolean!
  }
`;

export default UserTypeDefs;
