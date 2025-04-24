import { PoolClient } from "pg";
import { RegulatoryReport } from "./regulatoryReports.types";
import GraphQLJSON from "graphql-type-json";

export const regulatoryReportsResolvers = {
  JSON: GraphQLJSON,

  Query: {
    async getRegulatoryReportById(
      _: any,
      { report_id }: { report_id: number },
      { db }: { db: PoolClient }
    ) {
      const result = await db.query(
        "SELECT * FROM tax_compliance.regulatory_reports WHERE report_id = $1",
        [report_id]
      );
      return result.rows[0] || null;
    },
    async getAllRegulatoryReports(_: any, __: any, { db }: { db: PoolClient }) {
      const result = await db.query(
        "SELECT * FROM tax_compliance.regulatory_reports"
      );
      return result.rows;
    },
  },

  Mutation: {
    async createRegulatoryReport(
      _: any,
      { input }: { input: RegulatoryReport },
      { db }: { db: PoolClient }
    ) {
      const {
        report_type,
        client_id,
        report_data,
        report_date,
        submission_status,
      } = input;
      const result = await db.query(
        `INSERT INTO tax_compliance.regulatory_reports (report_type, client_id, report_data, report_date, submission_status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [report_type, client_id, report_data, report_date, submission_status]
      );
      return result.rows[0];
    },

    async updateRegulatoryReport(
      _: any,
      { report_id, input }: { report_id: number; input: RegulatoryReport },
      { db }: { db: PoolClient }
    ) {
      const {
        report_type,
        client_id,
        report_data,
        report_date,
        submission_status,
      } = input;
      const result = await db.query(
        `UPDATE tax_compliance.regulatory_reports
         SET report_type = $1, client_id = $2, report_data = $3, report_date = $4, submission_status = $5
         WHERE report_id = $6
         RETURNING *`,
        [
          report_type,
          client_id,
          report_data,
          report_date,
          submission_status,
          report_id,
        ]
      );
      return result.rows[0];
    },

    async deleteRegulatoryReport(
      _: any,
      { report_id }: { report_id: number },
      { db }: { db: PoolClient }
    ) {
      const result = await db.query(
        "DELETE FROM tax_compliance.regulatory_reports WHERE report_id = $1 RETURNING report_id",
        [report_id]
      );
      return result.rowCount !== null && result.rowCount > 0;
    },
  },
};
