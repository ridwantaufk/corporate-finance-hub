import { gql } from "graphql-tag";

const EFakturTypeDefs = gql`
  type EFaktur {
    faktur_id: Int!
    client_id: Int!
    faktur_number: String!
    faktur_date: String!
    total_amount: String!
    tax_amount: String!
    status: String!
    created_at: String!
    updated_at: String!
  }

  input EFakturInput {
    client_id: Int!
    faktur_number: String!
    faktur_date: String!
    total_amount: String!
    tax_amount: String!
    status: String!
  }

  type Query {
    getEFakturById(faktur_id: Int!): EFaktur
  }

  type Mutation {
    createEFaktur(input: EFakturInput): EFaktur
    updateEFaktur(faktur_id: Int!, input: EFakturInput): EFaktur
    deleteEFaktur(faktur_id: Int!): Boolean
  }
`;

export default EFakturTypeDefs;
