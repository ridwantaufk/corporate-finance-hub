import { gql } from "graphql-tag";

const RegulatoryReportsTypeDefs = gql`
  type RegulatoryReport {
    report_id: Int!
    client_id: Int!
    report_type: String!
    report_date: String!
    report_file_url: String!
    status: String!
    created_at: String!
    updated_at: String!
  }

  input RegulatoryReportInput {
    client_id: Int!
    report_type: String!
    report_date: String!
    report_file_url: String!
    status: String!
  }

  type Query {
    getRegulatoryReportById(report_id: Int!): RegulatoryReport
  }

  type Mutation {
    createRegulatoryReport(input: RegulatoryReportInput): RegulatoryReport
    updateRegulatoryReport(
      report_id: Int!
      input: RegulatoryReportInput
    ): RegulatoryReport
    deleteRegulatoryReport(report_id: Int!): Boolean
  }
`;

export default RegulatoryReportsTypeDefs;
