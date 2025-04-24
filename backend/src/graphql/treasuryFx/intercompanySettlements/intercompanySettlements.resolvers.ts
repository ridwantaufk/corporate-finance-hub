import {
  getIntercompanySettlements,
  getIntercompanySettlementById,
  createIntercompanySettlement,
  updateIntercompanySettlement,
  deleteIntercompanySettlement,
} from "./intercompanySettlements.services";

export const intercompanySettlementResolvers = {
  Query: {
    intercompanySettlements: async (_parent: any, _args: any, { db }: any) => {
      return getIntercompanySettlements(db);
    },
    intercompanySettlement: async (
      _parent: any,
      args: { settlement_id: number },
      { db }: any
    ) => {
      return getIntercompanySettlementById(args.settlement_id, db);
    },
  },
  Mutation: {
    createIntercompanySettlement: async (
      _parent: any,
      args: { input: any },
      { db }: any
    ) => {
      return createIntercompanySettlement(args.input, db);
    },
    updateIntercompanySettlement: async (
      _parent: any,
      args: { settlement_id: number; input: any },
      { db }: any
    ) => {
      return updateIntercompanySettlement(args.settlement_id, args.input, db);
    },
    deleteIntercompanySettlement: async (
      _parent: any,
      args: { settlement_id: number },
      { db }: any
    ) => {
      return deleteIntercompanySettlement(args.settlement_id, db);
    },
  },
};
