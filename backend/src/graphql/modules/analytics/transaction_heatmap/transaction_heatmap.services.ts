import db from "@/config/db";
import { TransactionHeatmap } from "./transaction_heatmap.types";

export const getTransactionHeatmapById = async (
  id: number
): Promise<TransactionHeatmap | null> => {
  const { rows } = await db.query(
    "SELECT * FROM transaction_heatmap WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const getAllTransactionHeatmaps = async (): Promise<
  TransactionHeatmap[]
> => {
  const { rows } = await db.query("SELECT * FROM transaction_heatmap");
  return rows;
};

export const createTransactionHeatmap = async (
  transaction_time: string,
  heatmap_value: number
): Promise<TransactionHeatmap> => {
  const { rows } = await db.query(
    "INSERT INTO transaction_heatmap (transaction_time, heatmap_value) VALUES ($1, $2) RETURNING *",
    [transaction_time, heatmap_value]
  );
  return rows[0];
};

export const updateTransactionHeatmap = async (
  id: number,
  transaction_time?: string,
  heatmap_value?: number
): Promise<TransactionHeatmap | null> => {
  const { rows } = await db.query(
    `
      UPDATE transaction_heatmap
      SET transaction_time = COALESCE($2, transaction_time), 
          heatmap_value = COALESCE($3, heatmap_value)
      WHERE id = $1
      RETURNING *
    `,
    [id, transaction_time, heatmap_value]
  );
  return rows[0] || null;
};

export const deleteTransactionHeatmap = async (
  id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM transaction_heatmap WHERE id = $1",
    [id]
  );
  return rowCount !== 0;
};
