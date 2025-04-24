import { PoolClient } from "pg";
import {
  EFaktur,
  CreateEFakturInput,
  UpdateEFakturInput,
} from "./eFaktur.types";

export async function getEFakturById(
  faktur_id: number,
  db: PoolClient
): Promise<EFaktur | null> {
  const result = await db.query(
    "SELECT * FROM tax_compliance.e_faktur WHERE faktur_id = $1",
    [faktur_id]
  );
  return result.rows[0] || null;
}

export async function getAllEFaktur(db: PoolClient): Promise<EFaktur[]> {
  const result = await db.query("SELECT * FROM tax_compliance.e_faktur");
  return result.rows;
}

export async function createEFaktur(
  input: CreateEFakturInput,
  db: PoolClient
): Promise<EFaktur> {
  const { client_id, amount, tax_rate, status } = input;
  const result = await db.query(
    `INSERT INTO tax_compliance.e_faktur (client_id, amount, tax_rate, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [client_id, amount, tax_rate, status]
  );
  return result.rows[0];
}

export async function updateEFaktur(
  faktur_id: number,
  input: UpdateEFakturInput,
  db: PoolClient
): Promise<EFaktur> {
  const { client_id, amount, tax_rate, status } = input;
  const result = await db.query(
    `UPDATE tax_compliance.e_faktur
     SET client_id = $1, amount = $2, tax_rate = $3, status = $4
     WHERE faktur_id = $5
     RETURNING *`,
    [client_id, amount, tax_rate, status, faktur_id]
  );
  return result.rows[0];
}

export async function deleteEFaktur(
  faktur_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM tax_compliance.e_faktur WHERE faktur_id = $1 RETURNING faktur_id",
    [faktur_id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
