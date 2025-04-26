import { gql } from "graphql-tag";

const ImportExportTrackingTypeDefs = gql`
  type ImportExportTracking {
    tracking_id: Int!
    shipment_id: String!
    shipment_date: String!
    origin: String!
    destination: String!
    current_status: String!
  }

  input ImportExportTrackingInput {
    shipment_id: String!
    shipment_date: String!
    origin: String!
    destination: String!
    current_status: String!
  }

  input ImportExportTrackingUpdateInput {
    shipment_id: String
    shipment_date: String
    origin: String
    destination: String
    current_status: String
  }

  extend type Query {
    getAllImportExportTrackings: [ImportExportTracking!]!
    getImportExportTrackingById(tracking_id: Int!): ImportExportTracking
  }

  extend type Mutation {
    createImportExportTracking(
      input: ImportExportTrackingInput!
    ): ImportExportTracking
    updateImportExportTracking(
      tracking_id: Int!
      input: ImportExportTrackingUpdateInput!
    ): ImportExportTracking
    deleteImportExportTracking(tracking_id: Int!): Boolean
  }
`;

export default ImportExportTrackingTypeDefs;
