import db from "@/config/db";
import { EFaktur, EFakturInput } from "./e_faktur.types";

export const createEFaktur = async (input: EFakturInput): Promise<EFaktur> => {
  const result = await db.query(
    `INSERT INTO tax_compliance.e_faktur (client_id, faktur_number, faktur_date, total_amount, tax_amount, status)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      input.client_id,
      input.faktur_number,
      input.faktur_date,
      input.total_amount,
      input.tax_amount,
      input.status,
    ]
  );
  return result.rows[0];
};

export const getEFakturById = async (
  faktur_id: number
): Promise<EFaktur | null> => {
  const result = await db.query(
    `SELECT * FROM tax_compliance.e_faktur WHERE faktur_id = $1`,
    [faktur_id]
  );
  return result.rows[0] || null;
};

export const updateEFaktur = async (
  faktur_id: number,
  input: EFakturInput
): Promise<EFaktur | null> => {
  const result = await db.query(
    `UPDATE tax_compliance.e_faktur
        SET client_id = $1, faktur_number = $2, faktur_date = $3, total_amount = $4, tax_amount = $5, status = $6, updated_at = CURRENT_TIMESTAMP
        WHERE faktur_id = $7 RETURNING *`,
    [
      input.client_id,
      input.faktur_number,
      input.faktur_date,
      input.total_amount,
      input.tax_amount,
      input.status,
      faktur_id,
    ]
  );
  return result.rows[0] || null;
};

export const deleteEFaktur = async (faktur_id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM tax_compliance.e_faktur WHERE faktur_id = $1`,
    [faktur_id]
  );
  return rowCount !== 0;
};
