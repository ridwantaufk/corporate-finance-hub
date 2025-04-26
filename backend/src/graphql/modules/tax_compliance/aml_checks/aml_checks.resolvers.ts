import {
  createAmlCheck,
  getAmlCheckById,
  updateAmlCheck,
  deleteAmlCheck,
} from "./aml_checks.services";
import { AmlCheckInput } from "./aml_checks.types";

const AmlChecksResolvers = {
  Query: {
    getAmlCheckById: async (_: any, { check_id }: { check_id: number }) => {
      return await getAmlCheckById(check_id);
    },
  },

  Mutation: {
    createAmlCheck: async (_: any, { input }: { input: AmlCheckInput }) => {
      return await createAmlCheck(input);
    },

    updateAmlCheck: async (
      _: any,
      { check_id, input }: { check_id: number; input: AmlCheckInput }
    ) => {
      return await updateAmlCheck(check_id, input);
    },

    deleteAmlCheck: async (_: any, { check_id }: { check_id: number }) => {
      return await deleteAmlCheck(check_id);
    },
  },
};

export default AmlChecksResolvers;
