import { PoolClient } from "pg";
import { CashPosition } from "./cashPosition.types";

export async function getCashPositions(
  db: PoolClient
): Promise<CashPosition[]> {
  const result = await db.query("SELECT * FROM cash_management.cash_positions");
  return result.rows;
}

export async function createCashPosition(
  input: CashPosition,
  db: PoolClient
): Promise<CashPosition> {
  const { va_id, amount, transaction_type, balance_after } = input;

  const result = await db.query(
    `INSERT INTO cash_management.cash_positions (va_id, amount, transaction_type, balance_after) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [va_id, amount, transaction_type, balance_after]
  );

  return result.rows[0];
}

export async function updateCashPosition(
  position_id: number,
  input: CashPosition,
  db: PoolClient
): Promise<CashPosition> {
  const { va_id, amount, transaction_type, balance_after } = input;

  const result = await db.query(
    `UPDATE cash_management.cash_positions 
     SET va_id = $1, amount = $2, transaction_type = $3, balance_after = $4, updated_at = CURRENT_TIMESTAMP 
     WHERE position_id = $5 
     RETURNING *`,
    [va_id, amount, transaction_type, balance_after, position_id]
  );

  return result.rows[0];
}

export async function deleteCashPosition(
  position_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM cash_management.cash_positions WHERE position_id = $1 RETURNING position_id",
    [position_id]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
