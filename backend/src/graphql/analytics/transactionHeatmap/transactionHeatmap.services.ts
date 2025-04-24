import { PoolClient } from "pg";
import { TransactionHeatmap } from "./transactionHeatmap.types";

export async function getTransactionHeatmaps(
  db: PoolClient
): Promise<TransactionHeatmap[]> {
  const result = await db.query("SELECT * FROM analytics.transaction_heatmap");
  return result.rows;
}

export async function getTransactionHeatmapById(
  heatmap_id: number,
  db: PoolClient
): Promise<TransactionHeatmap | null> {
  const result = await db.query(
    "SELECT * FROM analytics.transaction_heatmap WHERE heatmap_id = $1",
    [heatmap_id]
  );
  return result.rows[0] || null;
}

export async function createTransactionHeatmap(
  input: TransactionHeatmap,
  db: PoolClient
): Promise<TransactionHeatmap> {
  const { date, hour, transaction_count } = input;
  const result = await db.query(
    `INSERT INTO analytics.transaction_heatmap (date, hour, transaction_count)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [date, hour, transaction_count]
  );
  return result.rows[0];
}

export async function updateTransactionHeatmap(
  heatmap_id: number,
  input: TransactionHeatmap,
  db: PoolClient
): Promise<TransactionHeatmap> {
  const { date, hour, transaction_count } = input;
  const result = await db.query(
    `UPDATE analytics.transaction_heatmap
     SET date = $1, hour = $2, transaction_count = $3
     WHERE heatmap_id = $4
     RETURNING *`,
    [date, hour, transaction_count, heatmap_id]
  );
  return result.rows[0];
}

export async function deleteTransactionHeatmap(
  heatmap_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM analytics.transaction_heatmap WHERE heatmap_id = $1 RETURNING heatmap_id",
    [heatmap_id]
  );
  return result.rowCount !== 0;
}
