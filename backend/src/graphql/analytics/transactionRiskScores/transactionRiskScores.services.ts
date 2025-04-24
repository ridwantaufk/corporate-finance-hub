import { PoolClient } from "pg";
import { TransactionRiskScore } from "./transactionRiskScores.types";

export async function getTransactionRiskScores(
  db: PoolClient
): Promise<TransactionRiskScore[]> {
  const result = await db.query(
    "SELECT * FROM analytics.transaction_risk_scores"
  );
  return result.rows;
}

export async function getTransactionRiskScoreById(
  risk_id: number,
  db: PoolClient
): Promise<TransactionRiskScore | null> {
  const result = await db.query(
    "SELECT * FROM analytics.transaction_risk_scores WHERE risk_id = $1",
    [risk_id]
  );
  return result.rows[0] || null;
}

export async function createTransactionRiskScore(
  input: TransactionRiskScore,
  db: PoolClient
): Promise<TransactionRiskScore> {
  const { transaction_id, risk_score, status } = input;
  const result = await db.query(
    `INSERT INTO analytics.transaction_risk_scores (transaction_id, risk_score, status)
     VALUES ($1, $2, $3) RETURNING *`,
    [transaction_id, risk_score, status]
  );
  return result.rows[0];
}

export async function updateTransactionRiskScore(
  risk_id: number,
  input: TransactionRiskScore,
  db: PoolClient
): Promise<TransactionRiskScore> {
  const { risk_score, status } = input;
  const result = await db.query(
    `UPDATE analytics.transaction_risk_scores
     SET risk_score = $1, status = $2
     WHERE risk_id = $3 RETURNING *`,
    [risk_score, status, risk_id]
  );
  return result.rows[0];
}

export async function deleteTransactionRiskScore(
  risk_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM analytics.transaction_risk_scores WHERE risk_id = $1 RETURNING risk_id",
    [risk_id]
  );
  return result.rowCount !== 0;
}
