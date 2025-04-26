import db from "@/config/db";
import { ApprovalMatrix } from "./approval_matrix.types";

export const getApprovalMatrixById = async (
  id: number
): Promise<ApprovalMatrix | null> => {
  const { rows } = await db.query(
    "SELECT * FROM approval_matrix WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const getApprovalMatrixByRole = async (
  role: string
): Promise<ApprovalMatrix[]> => {
  const { rows } = await db.query(
    "SELECT * FROM approval_matrix WHERE role = $1",
    [role]
  );
  return rows;
};

export const createApprovalMatrix = async (
  role: string,
  approval_level: number,
  approver_role: string
): Promise<ApprovalMatrix> => {
  const { rows } = await db.query(
    "INSERT INTO approval_matrix (role, approval_level, approver_role) VALUES ($1, $2, $3) RETURNING *",
    [role, approval_level, approver_role]
  );
  return rows[0];
};

export const updateApprovalMatrix = async (
  id: number,
  role?: string,
  approval_level?: number,
  approver_role?: string
): Promise<ApprovalMatrix | null> => {
  const { rows } = await db.query(
    `
      UPDATE approval_matrix
      SET role = COALESCE($2, role), 
          approval_level = COALESCE($3, approval_level), 
          approver_role = COALESCE($4, approver_role)
      WHERE id = $1
      RETURNING *
    `,
    [id, role, approval_level, approver_role]
  );
  return rows[0] || null;
};

export const deleteApprovalMatrix = async (id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM approval_matrix WHERE id = $1",
    [id]
  );
  return rowCount !== 0;
};
