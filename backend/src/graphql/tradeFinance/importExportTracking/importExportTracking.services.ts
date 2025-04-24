import { PoolClient } from "pg";
import {
  ImportExportTracking,
  CreateImportExportTrackingInput,
} from "./importExportTracking.types";

export async function getImportExportTrackings(
  db: PoolClient
): Promise<ImportExportTracking[]> {
  const result = await db.query(
    "SELECT * FROM trade_finance.import_export_tracking"
  );
  return result.rows;
}

export async function getImportExportTrackingById(
  id: number,
  db: PoolClient
): Promise<ImportExportTracking | null> {
  const result = await db.query(
    "SELECT * FROM trade_finance.import_export_tracking WHERE tracking_id = $1",
    [id]
  );
  return result.rows[0] || null;
}

export async function createImportExportTracking(
  input: CreateImportExportTrackingInput,
  db: PoolClient
): Promise<ImportExportTracking> {
  const { shipment_id, shipment_date, origin, destination, current_status } =
    input;
  const result = await db.query(
    `INSERT INTO trade_finance.import_export_tracking 
     (shipment_id, shipment_date, origin, destination, current_status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [shipment_id, shipment_date, origin, destination, current_status]
  );
  return result.rows[0];
}

export async function updateImportExportTracking(
  id: number,
  input: CreateImportExportTrackingInput,
  db: PoolClient
): Promise<ImportExportTracking> {
  const { shipment_id, shipment_date, origin, destination, current_status } =
    input;
  const result = await db.query(
    `UPDATE trade_finance.import_export_tracking
     SET shipment_id = $1, shipment_date = $2, origin = $3, destination = $4, current_status = $5
     WHERE tracking_id = $6
     RETURNING *`,
    [shipment_id, shipment_date, origin, destination, current_status, id]
  );
  return result.rows[0];
}

export async function deleteImportExportTracking(
  id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM trade_finance.import_export_tracking WHERE tracking_id = $1 RETURNING tracking_id",
    [id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
