import db from "@/config/db";
import {
  FxTransaction,
  FxTransactionInput,
  FxTransactionUpdateInput,
} from "./fx_transactions.types";

export const createFxTransaction = async (
  input: FxTransactionInput
): Promise<FxTransaction> => {
  const result = await db.query(
    `INSERT INTO treasury_fx.fx_transactions (client_id, from_currency, to_currency, amount, exchange_rate)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      input.client_id,
      input.from_currency,
      input.to_currency,
      input.amount,
      input.exchange_rate,
    ]
  );
  return result.rows[0];
};

export const getAllFxTransactions = async (): Promise<FxTransaction[]> => {
  const result = await db.query(`SELECT * FROM treasury_fx.fx_transactions`);
  return result.rows;
};

export const getFxTransactionById = async (
  fx_transaction_id: number
): Promise<FxTransaction | null> => {
  const result = await db.query(
    `SELECT * FROM treasury_fx.fx_transactions WHERE fx_transaction_id = $1`,
    [fx_transaction_id]
  );
  return result.rows[0] || null;
};

export const updateFxTransaction = async (
  fx_transaction_id: number,
  input: FxTransactionUpdateInput
): Promise<FxTransaction | null> => {
  const fields = Object.keys(input);
  if (fields.length === 0) return null;

  const setQuery = fields
    .map((field, idx) => `${field} = $${idx + 2}`)
    .join(", ");
  const values = [fx_transaction_id, ...Object.values(input)];

  const result = await db.query(
    `UPDATE treasury_fx.fx_transactions SET ${setQuery} WHERE fx_transaction_id = $1 RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteFxTransaction = async (
  fx_transaction_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM treasury_fx.fx_transactions WHERE fx_transaction_id = $1`,
    [fx_transaction_id]
  );
  return rowCount !== 0;
};
