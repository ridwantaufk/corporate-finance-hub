import { PoolClient } from "pg";
import { CashFlowForecast } from "./cashFlowForecasts.types";

export async function getCashFlowForecasts(
  db: PoolClient
): Promise<CashFlowForecast[]> {
  const result = await db.query("SELECT * FROM analytics.cash_flow_forecasts");
  return result.rows;
}

export async function getCashFlowForecastById(
  forecast_id: number,
  db: PoolClient
): Promise<CashFlowForecast | null> {
  const result = await db.query(
    "SELECT * FROM analytics.cash_flow_forecasts WHERE forecast_id = $1",
    [forecast_id]
  );
  return result.rows[0] || null;
}

export async function createCashFlowForecast(
  input: CashFlowForecast,
  db: PoolClient
): Promise<CashFlowForecast> {
  const {
    client_id,
    forecast_date,
    forecast_amount,
    actual_amount,
    forecast_accuracy,
  } = input;
  const result = await db.query(
    `INSERT INTO analytics.cash_flow_forecasts (client_id, forecast_date, forecast_amount, actual_amount, forecast_accuracy)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      client_id,
      forecast_date,
      forecast_amount,
      actual_amount,
      forecast_accuracy,
    ]
  );
  return result.rows[0];
}

export async function updateCashFlowForecast(
  forecast_id: number,
  input: CashFlowForecast,
  db: PoolClient
): Promise<CashFlowForecast> {
  const {
    client_id,
    forecast_date,
    forecast_amount,
    actual_amount,
    forecast_accuracy,
  } = input;
  const result = await db.query(
    `UPDATE analytics.cash_flow_forecasts
     SET client_id = $1, forecast_date = $2, forecast_amount = $3, actual_amount = $4, forecast_accuracy = $5
     WHERE forecast_id = $6 RETURNING *`,
    [
      client_id,
      forecast_date,
      forecast_amount,
      actual_amount,
      forecast_accuracy,
      forecast_id,
    ]
  );
  return result.rows[0];
}

export async function deleteCashFlowForecast(
  forecast_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM analytics.cash_flow_forecasts WHERE forecast_id = $1 RETURNING forecast_id",
    [forecast_id]
  );
  return result.rowCount !== 0;
}
