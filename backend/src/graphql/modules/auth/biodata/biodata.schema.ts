import { gql } from "graphql-tag";

const biodataSchema = gql`
  type Biodata {
    biodata_id: ID!
    first_name: String!
    last_name: String!
    date_of_birth: String
    gender: String
    email: String
    phone: String
    address: String
    city: String
    state: String
    postal_code: String
    country: String
    nationality: String
    marital_status: String
    occupation: String
  }

  input BiodataInput {
    first_name: String!
    last_name: String!
    date_of_birth: String
    gender: String
    email: String
    phone: String
    address: String
    city: String
    state: String
    postal_code: String
    country: String
    nationality: String
    marital_status: String
    occupation: String
  }

  input BiodataUpdateInput {
    first_name: String
    last_name: String
    date_of_birth: String
    email: String
    phone: String
    age: Int
    gender: String
    address: String
    city: String
    state: String
    postal_code: String
    country: String
    nationality: String
    marital_status: String
    occupation: String
  }

  type Query {
    getBiodataById(biodata_id: ID!): Biodata
    getBiodatas: [Biodata!]!
  }

  type Mutation {
    createBiodata(input: BiodataInput!): Biodata!

    updateBiodata(biodata_id: ID!, input: BiodataUpdateInput!): Biodata!

    deleteBiodata(biodata_id: ID!): Boolean!
  }
`;

export default biodataSchema;
