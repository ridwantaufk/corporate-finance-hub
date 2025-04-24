import { gql } from "apollo-server-express";

export const usersTypeDefs = gql`
  type User {
    user_id: ID!
    username: String!
    email: String
    phone_number: String
    role: String!
    is_active: Boolean!
    created_at: String!
    updated_at: String!
  }

  input UserInput {
    username: String!
    password_hash: String!
    email: String
    phone_number: String
    role: String!
    is_active: Boolean
  }

  type Query {
    getUsers: [User!]!
    getUser(user_id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(user_id: ID!, input: UserInput!): User!
    deleteUser(user_id: ID!): Boolean!
  }
`;
