import GraphQLJSON from "graphql-type-json";
import {
  getImportExportTrackings,
  getImportExportTrackingById,
  createImportExportTracking,
  updateImportExportTracking,
  deleteImportExportTracking,
} from "./importExportTracking.services";

export const importExportTrackingResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getImportExportTrackings: async (_: any, __: any, { db }: any) => {
      return getImportExportTrackings(db);
    },
    getImportExportTrackingById: async (_: any, { id }: any, { db }: any) => {
      return getImportExportTrackingById(Number(id), db);
    },
  },
  Mutation: {
    createImportExportTracking: async (_: any, { input }: any, { db }: any) => {
      return createImportExportTracking(input, db);
    },
    updateImportExportTracking: async (
      _: any,
      { id, input }: any,
      { db }: any
    ) => {
      return updateImportExportTracking(Number(id), input, db);
    },
    deleteImportExportTracking: async (_: any, { id }: any, { db }: any) => {
      return deleteImportExportTracking(Number(id), db);
    },
  },
};
