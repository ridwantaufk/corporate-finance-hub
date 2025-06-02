import {
  createBiodata,
  getBiodataById,
  updateBiodata,
  deleteBiodataById,
  getBiodatas,
} from "./biodata.services";

const BiodataResolver = {
  Query: {
    getBiodataById: async (
      _parent: any,
      { biodata_id }: { biodata_id: string },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Get biodata by id is not authenticated");
      }
      return await getBiodataById(biodata_id);
    },
    getBiodatas: async (_: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error("get biodatas is not authenticated");
      }
      return await getBiodatas();
    },
  },
  Mutation: {
    createBiodata: async (
      _: any,
      {
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone,
        address,
        city,
        state,
        postal_code,
        country,
        nationality,
        marital_status,
        occupation,
        profile_picture,
      }: {
        first_name: string;
        last_name: string;
        date_of_birth?: Date;
        gender?: string;
        email: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
        nationality?: string;
        marital_status?: string;
        occupation?: string;
        profile_picture?: string;
      }
    ) => {
      return createBiodata(
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone,
        address,
        city,
        state,
        postal_code,
        country,
        nationality,
        marital_status,
        occupation,
        profile_picture
      );
    },

    updateBiodata: async (
      _: any,
      {
        biodata_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone,
        address,
        city,
        state,
        postal_code,
        country,
        nationality,
        marital_status,
        occupation,
        profile_picture,
      }: {
        biodata_id: number;
        first_name?: string;
        last_name?: string;
        date_of_birth?: Date;
        gender?: string;
        email?: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
        nationality?: string;
        marital_status?: string;
        occupation?: string;
        profile_picture?: string;
      }
    ) => {
      return updateBiodata(
        biodata_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone,
        address,
        city,
        state,
        postal_code,
        country,
        nationality,
        marital_status,
        occupation,
        profile_picture
      );
    },

    deleteBiodata: async (_: any, { biodata_id }: { biodata_id: number }) => {
      return deleteBiodataById(biodata_id);
    },
  },
};

export default BiodataResolver;
