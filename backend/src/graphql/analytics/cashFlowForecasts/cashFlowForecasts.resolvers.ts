import { PoolClient } from "pg";
import { CashFlowForecast } from "./cashFlowForecasts.types";
import {
  getCashFlowForecasts,
  getCashFlowForecastById,
  createCashFlowForecast,
  updateCashFlowForecast,
  deleteCashFlowForecast,
} from "./cashFlowForecasts.services";
import GraphQLJSON from "graphql-type-json";

export const cashFlowForecastResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getCashFlowForecasts: async (
      _parent: any,
      _args: any,
      { db }: { db: PoolClient }
    ) => {
      return getCashFlowForecasts(db);
    },
    getCashFlowForecastById: async (
      _parent: any,
      { forecast_id }: { forecast_id: number },
      { db }: { db: PoolClient }
    ) => {
      return getCashFlowForecastById(forecast_id, db);
    },
  },
  Mutation: {
    createCashFlowForecast: async (
      _parent: any,
      { input }: { input: CashFlowForecast },
      { db }: { db: PoolClient }
    ) => {
      return createCashFlowForecast(input, db);
    },
    updateCashFlowForecast: async (
      _parent: any,
      { forecast_id, input }: { forecast_id: number; input: CashFlowForecast },
      { db }: { db: PoolClient }
    ) => {
      return updateCashFlowForecast(forecast_id, input, db);
    },
    deleteCashFlowForecast: async (
      _parent: any,
      { forecast_id }: { forecast_id: number },
      { db }: { db: PoolClient }
    ) => {
      return deleteCashFlowForecast(forecast_id, db);
    },
  },
};
