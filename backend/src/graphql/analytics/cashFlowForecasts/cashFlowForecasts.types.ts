export interface CashFlowForecast {
  forecast_id: number;
  client_id: number;
  forecast_date: string;
  forecast_amount: number;
  actual_amount?: number;
  forecast_accuracy: number;
}
