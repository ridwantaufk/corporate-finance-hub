import { PoolClient } from "pg";
import { Reconciliation } from "./reconciliations.types";

export async function getReconciliations(
  db: PoolClient
): Promise<Reconciliation[]> {
  const result = await db.query(
    "SELECT * FROM payments_collections.reconciliations"
  );
  return result.rows;
}

export async function getReconciliationById(
  reconciliation_id: number,
  db: PoolClient
): Promise<Reconciliation | null> {
  const result = await db.query(
    "SELECT * FROM payments_collections.reconciliations WHERE reconciliation_id = $1",
    [reconciliation_id]
  );
  return result.rows[0] || null;
}

export async function createReconciliation(
  input: Reconciliation,
  db: PoolClient
): Promise<Reconciliation> {
  const { invoice_id, transaction_id, amount, reconciliation_status } = input;

  const result = await db.query(
    `INSERT INTO payments_collections.reconciliations (invoice_id, transaction_id, amount, reconciliation_status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [invoice_id, transaction_id, amount, reconciliation_status]
  );

  return result.rows[0];
}

export async function updateReconciliation(
  reconciliation_id: number,
  input: Reconciliation,
  db: PoolClient
): Promise<Reconciliation> {
  const { invoice_id, transaction_id, amount, reconciliation_status } = input;

  const result = await db.query(
    `UPDATE payments_collections.reconciliations
     SET invoice_id = $1, transaction_id = $2, amount = $3, reconciliation_status = $4
     WHERE reconciliation_id = $5
     RETURNING *`,
    [
      invoice_id,
      transaction_id,
      amount,
      reconciliation_status,
      reconciliation_id,
    ]
  );

  return result.rows[0];
}

export async function deleteReconciliation(
  reconciliation_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM payments_collections.reconciliations WHERE reconciliation_id = $1 RETURNING reconciliation_id",
    [reconciliation_id]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
