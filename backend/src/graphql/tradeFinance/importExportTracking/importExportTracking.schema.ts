import { gql } from "graphql-tag";

export const importExportTrackingTypeDefs = gql`
  scalar JSON

  type ImportExportTracking {
    tracking_id: ID!
    shipment_id: String!
    shipment_date: String!
    origin: String!
    destination: String!
    current_status: String!
  }

  input CreateImportExportTrackingInput {
    shipment_id: String!
    shipment_date: String!
    origin: String!
    destination: String!
    current_status: String!
  }

  type Query {
    getImportExportTrackings: [ImportExportTracking!]!
    getImportExportTrackingById(id: ID!): ImportExportTracking
  }

  type Mutation {
    createImportExportTracking(
      input: CreateImportExportTrackingInput!
    ): ImportExportTracking!
    updateImportExportTracking(
      id: ID!
      input: CreateImportExportTrackingInput!
    ): ImportExportTracking!
    deleteImportExportTracking(id: ID!): Boolean!
  }
`;
