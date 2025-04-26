import {
  createRegulatoryReport,
  getRegulatoryReportById,
  updateRegulatoryReport,
  deleteRegulatoryReport,
} from "./regulatory_reports.services";
import { RegulatoryReportInput } from "./regulatory_reports.types";

const RegulatoryReportsResolvers = {
  Query: {
    getRegulatoryReportById: async (
      _: any,
      { report_id }: { report_id: number }
    ) => {
      return await getRegulatoryReportById(report_id);
    },
  },

  Mutation: {
    createRegulatoryReport: async (
      _: any,
      { input }: { input: RegulatoryReportInput }
    ) => {
      return await createRegulatoryReport(input);
    },

    updateRegulatoryReport: async (
      _: any,
      { report_id, input }: { report_id: number; input: RegulatoryReportInput }
    ) => {
      return await updateRegulatoryReport(report_id, input);
    },

    deleteRegulatoryReport: async (
      _: any,
      { report_id }: { report_id: number }
    ) => {
      return await deleteRegulatoryReport(report_id);
    },
  },
};

export default RegulatoryReportsResolvers;
