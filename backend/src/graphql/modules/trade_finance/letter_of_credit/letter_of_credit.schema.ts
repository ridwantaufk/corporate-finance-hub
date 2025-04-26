import { gql } from "graphql-tag";

const LetterOfCreditTypeDefs = gql`
  type LetterOfCredit {
    lc_id: Int!
    client_id: Int!
    amount: Float!
    issue_date: String!
    expiry_date: String!
    status: String!
  }

  input LetterOfCreditInput {
    client_id: Int!
    amount: Float!
    issue_date: String!
    expiry_date: String!
    status: String!
  }

  input LetterOfCreditUpdateInput {
    amount: Float
    issue_date: String
    expiry_date: String
    status: String
  }

  extend type Query {
    getAllLetterOfCredits: [LetterOfCredit!]!
    getLetterOfCreditById(lc_id: Int!): LetterOfCredit
  }

  extend type Mutation {
    createLetterOfCredit(input: LetterOfCreditInput!): LetterOfCredit
    updateLetterOfCredit(
      lc_id: Int!
      input: LetterOfCreditUpdateInput!
    ): LetterOfCredit
    deleteLetterOfCredit(lc_id: Int!): Boolean
  }
`;

export default LetterOfCreditTypeDefs;
