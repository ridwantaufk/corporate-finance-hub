import { PoolClient } from "pg";
import {
  RegulatoryReport,
  CreateRegulatoryReportInput,
  UpdateRegulatoryReportInput,
} from "./regulatoryReports.types";

export async function getRegulatoryReportById(
  report_id: number,
  db: PoolClient
): Promise<RegulatoryReport | null> {
  const result = await db.query(
    "SELECT * FROM tax_compliance.regulatory_reports WHERE report_id = $1",
    [report_id]
  );
  return result.rows[0] || null;
}

export async function getAllRegulatoryReports(
  db: PoolClient
): Promise<RegulatoryReport[]> {
  const result = await db.query(
    "SELECT * FROM tax_compliance.regulatory_reports"
  );
  return result.rows;
}

export async function createRegulatoryReport(
  input: CreateRegulatoryReportInput,
  db: PoolClient
): Promise<RegulatoryReport> {
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
}

export async function updateRegulatoryReport(
  report_id: number,
  input: UpdateRegulatoryReportInput,
  db: PoolClient
): Promise<RegulatoryReport> {
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
}

export async function deleteRegulatoryReport(
  report_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM tax_compliance.regulatory_reports WHERE report_id = $1 RETURNING report_id",
    [report_id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
