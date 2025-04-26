import { gql } from "graphql-tag";

const ApprovalMatrixTypeDefs = gql`
  type ApprovalMatrix {
    id: Int!
    role: String!
    approval_level: Int!
    approver_role: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    getApprovalMatrix(id: Int!): ApprovalMatrix
    getApprovalMatrixByRole(role: String!): [ApprovalMatrix]
  }

  type Mutation {
    createApprovalMatrix(
      role: String!
      approval_level: Int!
      approver_role: String!
    ): ApprovalMatrix!
    updateApprovalMatrix(
      id: Int!
      role: String
      approval_level: Int
      approver_role: String
    ): ApprovalMatrix!
    deleteApprovalMatrix(id: Int!): Boolean!
  }
`;

export default ApprovalMatrixTypeDefs;
