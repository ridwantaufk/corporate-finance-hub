import {
  getApprovalMatrixById,
  getApprovalMatrixByRole,
  createApprovalMatrix,
  updateApprovalMatrix,
  deleteApprovalMatrix,
} from "./approval_matrix.services";

const ApprovalMatrixResolver = {
  Query: {
    getApprovalMatrix: (_: any, args: { id: number }) =>
      getApprovalMatrixById(args.id),
    getApprovalMatrixByRole: (_: any, args: { role: string }) =>
      getApprovalMatrixByRole(args.role),
  },
  Mutation: {
    createApprovalMatrix: (
      _: any,
      args: { role: string; approval_level: number; approver_role: string }
    ) =>
      createApprovalMatrix(args.role, args.approval_level, args.approver_role),
    updateApprovalMatrix: (
      _: any,
      args: {
        id: number;
        role?: string;
        approval_level?: number;
        approver_role?: string;
      }
    ) =>
      updateApprovalMatrix(
        args.id,
        args.role,
        args.approval_level,
        args.approver_role
      ),
    deleteApprovalMatrix: (_: any, args: { id: number }) =>
      deleteApprovalMatrix(args.id),
  },
};

export default ApprovalMatrixResolver;
