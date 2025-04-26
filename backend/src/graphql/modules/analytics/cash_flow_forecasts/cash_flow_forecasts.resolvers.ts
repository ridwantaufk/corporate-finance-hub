import {
  getCashFlowForecastById,
  getAllCashFlowForecasts,
  createCashFlowForecast,
  updateCashFlowForecast,
  deleteCashFlowForecast,
} from "./cash_flow_forecasts.services";

const CashFlowForecastsResolver = {
  Query: {
    getCashFlowForecast: (_: any, args: { id: number }) =>
      getCashFlowForecastById(args.id),
    getAllCashFlowForecasts: () => getAllCashFlowForecasts(),
  },
  Mutation: {
    createCashFlowForecast: (
      _: any,
      args: {
        forecast_date: string;
        forecast_amount: number;
        actual_amount: number;
      }
    ) =>
      createCashFlowForecast(
        args.forecast_date,
        args.forecast_amount,
        args.actual_amount
      ),
    updateCashFlowForecast: (
      _: any,
      args: {
        id: number;
        forecast_date?: string;
        forecast_amount?: number;
        actual_amount?: number;
      }
    ) =>
      updateCashFlowForecast(
        args.id,
        args.forecast_date,
        args.forecast_amount,
        args.actual_amount
      ),
    deleteCashFlowForecast: (_: any, args: { id: number }) =>
      deleteCashFlowForecast(args.id),
  },
};

export default CashFlowForecastsResolver;
