import { gql } from "graphql-tag";

const UserTypeDefs = gql`
  scalar JSON

  type User {
    user_id: ID!
    username: String!
    role: String!
    is_active: Boolean!
    biodata: Biodata
    created_at: String!
    updated_at: String!
  }

  input CreateUserInput {
    username: String!
    password: String!
    role: String!
    is_active: Boolean!
    biodata: BiodataInput!
  }

  input UpdateUserInput {
    username: String
    password: String
    role: String
    is_active: Boolean
    biodata: BiodataInput
  }

  type LoginResponse {
    success: Boolean!
    message: String!
  }

  type OAuthLoginResponse {
    success: Boolean!
    message: String!
    user: OAuthUser
  }

  type OAuthUser {
    id: ID
    email: String
    name: String
  }

  type CreateUserResponse {
    success: Boolean!
    message: String!
  }

  type CaptchaResponse {
    data: JSON
    solution: JSON
  }

  type VerifyCaptchaResponse {
    result: String!
    token: String
  }

  type Query {
    getCaptcha: CaptchaResponse!
    verifyCaptcha(responseBody: JSON!): VerifyCaptchaResponse!
    getUsers: [User!]!
    getUserById(user_id: ID!): User
    me: User
  }

  type Mutation {
    login(
      username: String!
      password: String!
      captchaResponse: JSON!
    ): LoginResponse!
    verifyCaptcha(responseBody: JSON!): VerifyCaptchaResponse!
    oAuthLogin(provider: String!, code: String!): OAuthLoginResponse!
    createUser(input: CreateUserInput!): CreateUserResponse!
    updateUser(user_id: ID!, input: UpdateUserInput!): User!
    deleteUser(user_id: ID!): Boolean!
    logout: Boolean!
  }
`;

export default UserTypeDefs;
