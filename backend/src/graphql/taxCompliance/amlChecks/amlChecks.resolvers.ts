import { PoolClient } from "pg";
import { AMLCheck } from "./amlChecks.types";
import * as amlCheckService from "./amlChecks.services";

export const amlCheckResolvers = {
  Query: {
    getAMLChecks: async (_: any, __: any, { db }: { db: PoolClient }) => {
      return amlCheckService.getAMLChecks(db);
    },
    getAMLCheckById: async (
      _: any,
      { check_id }: { check_id: number },
      { db }: { db: PoolClient }
    ) => {
      return amlCheckService.getAMLCheckById(check_id, db);
    },
  },

  Mutation: {
    createAMLCheck: async (
      _: any,
      { input }: { input: any },
      { db }: { db: PoolClient }
    ) => {
      return amlCheckService.createAMLCheck(input, db);
    },
    updateAMLCheck: async (
      _: any,
      { check_id, input }: { check_id: number; input: any },
      { db }: { db: PoolClient }
    ) => {
      return amlCheckService.updateAMLCheck(check_id, input, db);
    },
    deleteAMLCheck: async (
      _: any,
      { check_id }: { check_id: number },
      { db }: { db: PoolClient }
    ) => {
      return amlCheckService.deleteAMLCheck(check_id, db);
    },
  },
};
