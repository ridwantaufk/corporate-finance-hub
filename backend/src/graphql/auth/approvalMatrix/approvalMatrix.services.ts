import { PoolClient } from "pg";
import { ApprovalMatrix } from "./approvalMatrix.types";

export async function getApprovalMatrix(
  db: PoolClient
): Promise<ApprovalMatrix[]> {
  const result = await db.query("SELECT * FROM auth.approval_matrix");
  return result.rows;
}

export async function createApprovalMatrix(
  input: ApprovalMatrix,
  db: PoolClient
): Promise<ApprovalMatrix> {
  const { role, min_approval_level, max_approval_level } = input;

  const result = await db.query(
    `INSERT INTO auth.approval_matrix (role, min_approval_level, max_approval_level) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [role, min_approval_level, max_approval_level]
  );

  return result.rows[0];
}
