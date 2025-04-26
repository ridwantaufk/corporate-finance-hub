import { gql } from "graphql-tag";

const AmlChecksTypeDefs = gql`
  type AmlCheck {
    check_id: Int!
    client_id: Int!
    check_date: String!
    result: String!
    notes: String
    created_at: String!
    updated_at: String!
  }

  input AmlCheckInput {
    client_id: Int!
    check_date: String!
    result: String!
    notes: String
  }

  type Query {
    getAmlCheckById(check_id: Int!): AmlCheck
  }

  type Mutation {
    createAmlCheck(input: AmlCheckInput): AmlCheck
    updateAmlCheck(check_id: Int!, input: AmlCheckInput): AmlCheck
    deleteAmlCheck(check_id: Int!): Boolean
  }
`;
export default AmlChecksTypeDefs;
