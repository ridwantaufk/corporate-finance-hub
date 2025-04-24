import { gql } from "apollo-server-express";

export const eFakturTypeDefs = gql`
  scalar JSON

  type EFaktur {
    faktur_id: ID!
    client_id: Int!
    amount: Float!
    tax_rate: Float
    status: String!
  }

  input CreateEFakturInput {
    client_id: Int!
    amount: Float!
    tax_rate: Float
    status: String!
  }

  input UpdateEFakturInput {
    client_id: Int!
    amount: Float!
    tax_rate: Float
    status: String!
  }

  type Query {
    getEFakturById(faktur_id: ID!): EFaktur
    getAllEFaktur: [EFaktur]
  }

  type Mutation {
    createEFaktur(input: CreateEFakturInput): EFaktur
    updateEFaktur(faktur_id: ID!, input: UpdateEFakturInput): EFaktur
    deleteEFaktur(faktur_id: ID!): Boolean
  }
`;
