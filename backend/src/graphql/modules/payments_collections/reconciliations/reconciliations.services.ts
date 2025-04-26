import db from "@/config/db";
import { Reconciliation } from "./reconciliations.types";

export const getReconciliationById = async (
  reconciliation_id: number
): Promise<Reconciliation | null> => {
  const { rows } = await db.query(
    "SELECT * FROM payments_collections.reconciliations WHERE reconciliation_id = $1",
    [reconciliation_id]
  );
  return rows[0] || null;
};

export const getAllReconciliations = async (): Promise<Reconciliation[]> => {
  const { rows } = await db.query(
    "SELECT * FROM payments_collections.reconciliations"
  );
  return rows;
};

export const createReconciliation = async (
  invoice_id: number,
  transaction_id: number,
  amount: number,
  reconciliation_status: string
): Promise<Reconciliation> => {
  const { rows } = await db.query(
    "INSERT INTO payments_collections.reconciliations (invoice_id, transaction_id, amount, reconciliation_status) VALUES ($1, $2, $3, $4) RETURNING *",
    [invoice_id, transaction_id, amount, reconciliation_status]
  );
  return rows[0];
};

export const updateReconciliation = async (
  reconciliation_id: number,
  amount?: number,
  reconciliation_status?: string
): Promise<Reconciliation | null> => {
  const { rows } = await db.query(
    `
      UPDATE payments_collections.reconciliations
      SET amount = COALESCE($2, amount),
          reconciliation_status = COALESCE($3, reconciliation_status)
      WHERE reconciliation_id = $1
      RETURNING *
    `,
    [reconciliation_id, amount, reconciliation_status]
  );
  return rows[0] || null;
};

export const deleteReconciliation = async (
  reconciliation_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM payments_collections.reconciliations WHERE reconciliation_id = $1",
    [reconciliation_id]
  );
  return rowCount !== 0;
};
