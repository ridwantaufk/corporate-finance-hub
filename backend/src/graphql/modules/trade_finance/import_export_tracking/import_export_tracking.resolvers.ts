import {
  createImportExportTracking,
  getAllImportExportTrackings,
  getImportExportTrackingById,
  updateImportExportTracking,
  deleteImportExportTracking,
} from "./import_export_tracking.services";

const importExportTrackingResolvers = {
  Query: {
    getAllImportExportTrackings: async () =>
      await getAllImportExportTrackings(),
    getImportExportTrackingById: async (
      _: any,
      { tracking_id }: { tracking_id: number }
    ) => await getImportExportTrackingById(tracking_id),
  },
  Mutation: {
    createImportExportTracking: async (_: any, { input }: any) =>
      await createImportExportTracking(input),
    updateImportExportTracking: async (_: any, { tracking_id, input }: any) =>
      await updateImportExportTracking(tracking_id, input),
    deleteImportExportTracking: async (_: any, { tracking_id }: any) =>
      await deleteImportExportTracking(tracking_id),
  },
};

export default importExportTrackingResolvers;
