import { PoolClient } from "pg";
import { AMLCheck } from "./amlChecks.types";

export async function getAMLChecks(db: PoolClient): Promise<AMLCheck[]> {
  const result = await db.query("SELECT * FROM tax_compliance.aml_checks");
  return result.rows;
}

export async function getAMLCheckById(
  check_id: number,
  db: PoolClient
): Promise<AMLCheck | null> {
  const result = await db.query(
    "SELECT * FROM tax_compliance.aml_checks WHERE check_id = $1",
    [check_id]
  );
  return result.rows[0] || null;
}

export async function createAMLCheck(
  input: AMLCheck,
  db: PoolClient
): Promise<AMLCheck> {
  const { client_id, transaction_id, status } = input;

  const result = await db.query(
    `INSERT INTO tax_compliance.aml_checks (client_id, transaction_id, status)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [client_id, transaction_id, status]
  );

  return result.rows[0];
}

export async function updateAMLCheck(
  check_id: number,
  input: AMLCheck,
  db: PoolClient
): Promise<AMLCheck> {
  const { client_id, transaction_id, status } = input;

  const result = await db.query(
    `UPDATE tax_compliance.aml_checks
     SET client_id = $1, transaction_id = $2, status = $3
     WHERE check_id = $4
     RETURNING *`,
    [client_id, transaction_id, status, check_id]
  );

  return result.rows[0];
}

export async function deleteAMLCheck(
  check_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM tax_compliance.aml_checks WHERE check_id = $1 RETURNING check_id",
    [check_id]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
