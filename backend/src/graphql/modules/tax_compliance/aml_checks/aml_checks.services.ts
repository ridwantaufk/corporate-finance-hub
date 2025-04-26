import db from "@/config/db";
import { AmlCheck, AmlCheckInput } from "./aml_checks.types";

export const createAmlCheck = async (
  input: AmlCheckInput
): Promise<AmlCheck> => {
  const result = await db.query(
    `INSERT INTO tax_compliance.aml_checks (client_id, check_date, result, notes)
        VALUES ($1, $2, $3, $4) RETURNING *`,
    [input.client_id, input.check_date, input.result, input.notes]
  );
  return result.rows[0];
};

export const getAmlCheckById = async (
  check_id: number
): Promise<AmlCheck | null> => {
  const result = await db.query(
    `SELECT * FROM tax_compliance.aml_checks WHERE check_id = $1`,
    [check_id]
  );
  return result.rows[0] || null;
};

export const updateAmlCheck = async (
  check_id: number,
  input: AmlCheckInput
): Promise<AmlCheck | null> => {
  const result = await db.query(
    `UPDATE tax_compliance.aml_checks
        SET client_id = $1, check_date = $2, result = $3, notes = $4, updated_at = CURRENT_TIMESTAMP
        WHERE check_id = $5 RETURNING *`,
    [input.client_id, input.check_date, input.result, input.notes, check_id]
  );
  return result.rows[0] || null;
};

export const deleteAmlCheck = async (check_id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM tax_compliance.aml_checks WHERE check_id = $1`,
    [check_id]
  );
  return rowCount !== 0;
};
