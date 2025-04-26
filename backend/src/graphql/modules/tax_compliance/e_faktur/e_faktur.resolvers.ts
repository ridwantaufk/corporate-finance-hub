import {
  createEFaktur,
  getEFakturById,
  updateEFaktur,
  deleteEFaktur,
} from "./e_faktur.services";
import { EFakturInput } from "./e_faktur.types";

const EFakturResolver = {
  Query: {
    getEFakturById: async (_: any, { faktur_id }: { faktur_id: number }) => {
      return await getEFakturById(faktur_id);
    },
  },

  Mutation: {
    createEFaktur: async (_: any, { input }: { input: EFakturInput }) => {
      return await createEFaktur(input);
    },

    updateEFaktur: async (
      _: any,
      { faktur_id, input }: { faktur_id: number; input: EFakturInput }
    ) => {
      return await updateEFaktur(faktur_id, input);
    },

    deleteEFaktur: async (_: any, { faktur_id }: { faktur_id: number }) => {
      return await deleteEFaktur(faktur_id);
    },
  },
};

export default EFakturResolver;
