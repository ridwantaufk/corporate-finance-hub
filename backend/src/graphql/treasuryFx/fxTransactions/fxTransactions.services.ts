import { PoolClient } from "pg";
import {
  FxTransaction,
  CreateFxTransactionInput,
} from "./fxTransactions.types";

export async function getFxTransactions(
  db: PoolClient
): Promise<FxTransaction[]> {
  const result = await db.query(
    "SELECT * FROM treasury_fx.fx_transactions ORDER BY transaction_date DESC"
  );
  return result.rows;
}

export async function getFxTransactionById(
  id: number,
  db: PoolClient
): Promise<FxTransaction | null> {
  const result = await db.query(
    "SELECT * FROM treasury_fx.fx_transactions WHERE fx_transaction_id = $1",
    [id]
  );
  return result.rows[0] || null;
}

export async function createFxTransaction(
  input: CreateFxTransactionInput,
  db: PoolClient
): Promise<FxTransaction> {
  const { client_id, from_currency, to_currency, amount, exchange_rate } =
    input;

  const result = await db.query(
    `INSERT INTO treasury_fx.fx_transactions 
     (client_id, from_currency, to_currency, amount, exchange_rate)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [client_id, from_currency, to_currency, amount, exchange_rate]
  );

  return result.rows[0];
}

export async function deleteFxTransaction(
  id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM treasury_fx.fx_transactions WHERE fx_transaction_id = $1 RETURNING fx_transaction_id",
    [id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
