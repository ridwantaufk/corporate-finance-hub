import db from "@/config/db";
import { CashPosition } from "./cash_positions.types";

export const getCashPositionById = async (
  id: number
): Promise<CashPosition | null> => {
  const { rows } = await db.query(
    "SELECT * FROM cash_positions WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const getAllCashPositions = async (): Promise<CashPosition[]> => {
  const { rows } = await db.query("SELECT * FROM cash_positions");
  return rows;
};

export const createCashPosition = async (
  account_id: number,
  amount: number,
  currency: string,
  position_date: string
): Promise<CashPosition> => {
  const { rows } = await db.query(
    "INSERT INTO cash_positions (account_id, amount, currency, position_date) VALUES ($1, $2, $3, $4) RETURNING *",
    [account_id, amount, currency, position_date]
  );
  return rows[0];
};

export const updateCashPosition = async (
  id: number,
  account_id?: number,
  amount?: number,
  currency?: string,
  position_date?: string
): Promise<CashPosition | null> => {
  const { rows } = await db.query(
    `
      UPDATE cash_positions
      SET account_id = COALESCE($2, account_id), 
          amount = COALESCE($3, amount),
          currency = COALESCE($4, currency),
          position_date = COALESCE($5, position_date)
      WHERE id = $1
      RETURNING *
    `,
    [id, account_id, amount, currency, position_date]
  );
  return rows[0] || null;
};

export const deleteCashPosition = async (id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM cash_positions WHERE id = $1",
    [id]
  );
  return rowCount !== 0;
};
