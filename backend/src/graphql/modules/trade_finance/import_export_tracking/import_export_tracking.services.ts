import db from "@/config/db";
import {
  ImportExportTracking,
  ImportExportTrackingInput,
  ImportExportTrackingUpdateInput,
} from "./import_export_tracking.types";

export const createImportExportTracking = async (
  input: ImportExportTrackingInput
): Promise<ImportExportTracking> => {
  const result = await db.query(
    `INSERT INTO trade_finance.import_export_tracking (shipment_id, shipment_date, origin, destination, current_status)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      input.shipment_id,
      input.shipment_date,
      input.origin,
      input.destination,
      input.current_status,
    ]
  );
  return result.rows[0];
};

export const getAllImportExportTrackings = async (): Promise<
  ImportExportTracking[]
> => {
  const result = await db.query(
    `SELECT * FROM trade_finance.import_export_tracking`
  );
  return result.rows;
};

export const getImportExportTrackingById = async (
  tracking_id: number
): Promise<ImportExportTracking | null> => {
  const result = await db.query(
    `SELECT * FROM trade_finance.import_export_tracking WHERE tracking_id = $1`,
    [tracking_id]
  );
  return result.rows[0] || null;
};

export const updateImportExportTracking = async (
  tracking_id: number,
  input: ImportExportTrackingUpdateInput
): Promise<ImportExportTracking | null> => {
  const fields = Object.keys(input);
  if (fields.length === 0) return null;

  const setQuery = fields
    .map((field, idx) => `${field} = $${idx + 2}`)
    .join(", ");
  const values = [tracking_id, ...Object.values(input)];

  const result = await db.query(
    `UPDATE trade_finance.import_export_tracking SET ${setQuery} WHERE tracking_id = $1 RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteImportExportTracking = async (
  tracking_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM trade_finance.import_export_tracking WHERE tracking_id = $1`,
    [tracking_id]
  );
  return rowCount !== 0;
};
