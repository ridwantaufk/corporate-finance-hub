import { gql } from "apollo-server-express";

export const approvalMatrixTypeDefs = gql`
  type ApprovalMatrix {
    role: String!
    min_approval_level: Int!
    max_approval_level: Int!
  }

  input ApprovalMatrixInput {
    role: String!
    min_approval_level: Int!
    max_approval_level: Int!
  }

  type Query {
    getApprovalMatrix: [ApprovalMatrix!]!
    getApprovalMatrixByRole(role: String!): ApprovalMatrix
  }

  type Mutation {
    createApprovalMatrix(input: ApprovalMatrixInput!): ApprovalMatrix!
    updateApprovalMatrix(
      role: String!
      input: ApprovalMatrixInput!
    ): ApprovalMatrix!
  }
`;
