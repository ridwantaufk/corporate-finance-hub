import { gql } from "apollo-server-express";

export const regulatoryReportsTypeDefs = gql`
  type RegulatoryReport {
    report_id: ID!
    report_type: String!
    client_id: Int!
    report_data: JSON!
    report_date: String!
    submission_status: String!
  }

  input CreateRegulatoryReportInput {
    report_type: String!
    client_id: Int!
    report_data: JSON!
    report_date: String!
    submission_status: String!
  }

  input UpdateRegulatoryReportInput {
    report_type: String!
    client_id: Int!
    report_data: JSON!
    report_date: String!
    submission_status: String!
  }

  type Query {
    getRegulatoryReportById(report_id: ID!): RegulatoryReport
    getAllRegulatoryReports: [RegulatoryReport]
  }

  type Mutation {
    createRegulatoryReport(input: CreateRegulatoryReportInput): RegulatoryReport
    updateRegulatoryReport(
      report_id: ID!
      input: UpdateRegulatoryReportInput
    ): RegulatoryReport
    deleteRegulatoryReport(report_id: ID!): Boolean
  }
`;
