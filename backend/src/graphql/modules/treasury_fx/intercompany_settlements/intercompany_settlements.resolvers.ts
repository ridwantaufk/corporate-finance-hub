import {
  createIntercompanySettlement,
  getAllIntercompanySettlements,
  getIntercompanySettlementById,
  updateIntercompanySettlement,
  deleteIntercompanySettlement,
} from "./intercompany_settlements.services";

const IntercompanySettlementsResolver = {
  Query: {
    getAllIntercompanySettlements: async () =>
      await getAllIntercompanySettlements(),
    getIntercompanySettlementById: async (
      _: any,
      { settlement_id }: { settlement_id: number }
    ) => await getIntercompanySettlementById(settlement_id),
  },
  Mutation: {
    createIntercompanySettlement: async (_: any, { input }: any) =>
      await createIntercompanySettlement(input),
    updateIntercompanySettlement: async (
      _: any,
      { settlement_id, input }: any
    ) => await updateIntercompanySettlement(settlement_id, input),
    deleteIntercompanySettlement: async (_: any, { settlement_id }: any) =>
      await deleteIntercompanySettlement(settlement_id),
  },
};

export default IntercompanySettlementsResolver;
