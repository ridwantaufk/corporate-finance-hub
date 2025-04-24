import { gql } from "graphql-tag";

export const letterOfCreditTypeDefs = gql`
  scalar JSON

  type LetterOfCredit {
    lc_id: ID!
    client_id: Int!
    amount: Float!
    issue_date: String!
    expiry_date: String!
    status: String!
  }

  input CreateLetterOfCreditInput {
    client_id: Int!
    amount: Float!
    issue_date: String!
    expiry_date: String!
    status: String!
  }

  type Query {
    getLetterOfCredits: [LetterOfCredit!]!
    getLetterOfCreditById(id: ID!): LetterOfCredit
  }

  type Mutation {
    createLetterOfCredit(input: CreateLetterOfCreditInput!): LetterOfCredit!
    updateLetterOfCredit(
      id: ID!
      input: CreateLetterOfCreditInput!
    ): LetterOfCredit!
    deleteLetterOfCredit(id: ID!): Boolean!
  }
`;
