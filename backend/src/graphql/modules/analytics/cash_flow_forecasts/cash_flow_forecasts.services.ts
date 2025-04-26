import db from "@/config/db";
import { CashFlowForecast } from "./cash_flow_forecasts.types";

export const getCashFlowForecastById = async (
  id: number
): Promise<CashFlowForecast | null> => {
  const { rows } = await db.query(
    "SELECT * FROM cash_flow_forecasts WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const getAllCashFlowForecasts = async (): Promise<
  CashFlowForecast[]
> => {
  const { rows } = await db.query("SELECT * FROM cash_flow_forecasts");
  return rows;
};

export const createCashFlowForecast = async (
  forecast_date: string,
  forecast_amount: number,
  actual_amount: number
): Promise<CashFlowForecast> => {
  const { rows } = await db.query(
    "INSERT INTO cash_flow_forecasts (forecast_date, forecast_amount, actual_amount) VALUES ($1, $2, $3) RETURNING *",
    [forecast_date, forecast_amount, actual_amount]
  );
  return rows[0];
};

export const updateCashFlowForecast = async (
  id: number,
  forecast_date?: string,
  forecast_amount?: number,
  actual_amount?: number
): Promise<CashFlowForecast | null> => {
  const { rows } = await db.query(
    `
      UPDATE cash_flow_forecasts
      SET forecast_date = COALESCE($2, forecast_date), 
          forecast_amount = COALESCE($3, forecast_amount), 
          actual_amount = COALESCE($4, actual_amount)
      WHERE id = $1
      RETURNING *
    `,
    [id, forecast_date, forecast_amount, actual_amount]
  );
  return rows[0] || null;
};

export const deleteCashFlowForecast = async (id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM cash_flow_forecasts WHERE id = $1",
    [id]
  );
  return rowCount !== 0;
};
