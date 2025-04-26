import db from "@/config/db";
import { TransactionRiskScore } from "./transaction_risk_scores.types";

export const getTransactionRiskScoreById = async (
  id: number
): Promise<TransactionRiskScore | null> => {
  const { rows } = await db.query(
    "SELECT * FROM transaction_risk_scores WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const getAllTransactionRiskScores = async (): Promise<
  TransactionRiskScore[]
> => {
  const { rows } = await db.query("SELECT * FROM transaction_risk_scores");
  return rows;
};

export const createTransactionRiskScore = async (
  transaction_id: number,
  risk_score: number
): Promise<TransactionRiskScore> => {
  const { rows } = await db.query(
    "INSERT INTO transaction_risk_scores (transaction_id, risk_score) VALUES ($1, $2) RETURNING *",
    [transaction_id, risk_score]
  );
  return rows[0];
};

export const updateTransactionRiskScore = async (
  id: number,
  transaction_id?: number,
  risk_score?: number
): Promise<TransactionRiskScore | null> => {
  const { rows } = await db.query(
    `
      UPDATE transaction_risk_scores
      SET transaction_id = COALESCE($2, transaction_id), 
          risk_score = COALESCE($3, risk_score)
      WHERE id = $1
      RETURNING *
    `,
    [id, transaction_id, risk_score]
  );
  return rows[0] || null;
};

export const deleteTransactionRiskScore = async (
  id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM transaction_risk_scores WHERE id = $1",
    [id]
  );
  return rowCount !== 0;
};
