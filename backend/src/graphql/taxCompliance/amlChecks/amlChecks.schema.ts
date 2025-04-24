import { gql } from "apollo-server-express";

export const amlChecksTypeDefs = gql`
  scalar JSON

  type AMLCheck {
    check_id: ID!
    client_id: Int!
    transaction_id: Int!
    status: String!
  }

  input CreateAMLCheckInput {
    client_id: Int!
    transaction_id: Int!
    status: String!
  }

  input UpdateAMLCheckInput {
    client_id: Int
    transaction_id: Int
    status: String
  }

  type Query {
    getAMLChecks: [AMLCheck!]!
    getAMLCheckById(check_id: ID!): AMLCheck
  }

  type Mutation {
    createAMLCheck(input: CreateAMLCheckInput!): AMLCheck!
    updateAMLCheck(check_id: ID!, input: UpdateAMLCheckInput!): AMLCheck!
    deleteAMLCheck(check_id: ID!): Boolean!
  }
`;
