import db from "@/config/db";
import {
  RegulatoryReport,
  RegulatoryReportInput,
} from "./regulatory_reports.types";

export const createRegulatoryReport = async (
  input: RegulatoryReportInput
): Promise<RegulatoryReport> => {
  const result = await db.query(
    `INSERT INTO tax_compliance.regulatory_reports (client_id, report_type, report_date, report_file_url, status)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      input.client_id,
      input.report_type,
      input.report_date,
      input.report_file_url,
      input.status,
    ]
  );
  return result.rows[0];
};

export const getRegulatoryReportById = async (
  report_id: number
): Promise<RegulatoryReport | null> => {
  const result = await db.query(
    `SELECT * FROM tax_compliance.regulatory_reports WHERE report_id = $1`,
    [report_id]
  );
  return result.rows[0] || null;
};

export const updateRegulatoryReport = async (
  report_id: number,
  input: RegulatoryReportInput
): Promise<RegulatoryReport | null> => {
  const result = await db.query(
    `UPDATE tax_compliance.regulatory_reports
        SET client_id = $1, report_type = $2, report_date = $3, report_file_url = $4, status = $5, updated_at = CURRENT_TIMESTAMP
        WHERE report_id = $6 RETURNING *`,
    [
      input.client_id,
      input.report_type,
      input.report_date,
      input.report_file_url,
      input.status,
      report_id,
    ]
  );
  return result.rows[0] || null;
};

export const deleteRegulatoryReport = async (
  report_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM tax_compliance.regulatory_reports WHERE report_id = $1`,
    [report_id]
  );
  return rowCount !== 0;
};
