import { PoolClient } from "pg";
import {
  InvoiceFinancing,
  CreateInvoiceFinancingInput,
} from "./invoiceFinancing.types";

export async function getInvoiceFinancings(
  db: PoolClient
): Promise<InvoiceFinancing[]> {
  const result = await db.query(
    "SELECT * FROM trade_finance.invoice_financing"
  );
  return result.rows;
}

export async function getInvoiceFinancingById(
  id: number,
  db: PoolClient
): Promise<InvoiceFinancing | null> {
  const result = await db.query(
    "SELECT * FROM trade_finance.invoice_financing WHERE invoice_id = $1",
    [id]
  );
  return result.rows[0] || null;
}

export async function createInvoiceFinancing(
  input: CreateInvoiceFinancingInput,
  db: PoolClient
): Promise<InvoiceFinancing> {
  const { client_id, amount, financing_status } = input;
  const result = await db.query(
    `INSERT INTO trade_finance.invoice_financing (client_id, amount, financing_status)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [client_id, amount, financing_status]
  );
  return result.rows[0];
}

export async function updateInvoiceFinancing(
  id: number,
  input: CreateInvoiceFinancingInput,
  db: PoolClient
): Promise<InvoiceFinancing> {
  const { client_id, amount, financing_status } = input;
  const result = await db.query(
    `UPDATE trade_finance.invoice_financing
     SET client_id = $1, amount = $2, financing_status = $3
     WHERE invoice_id = $4
     RETURNING *`,
    [client_id, amount, financing_status, id]
  );
  return result.rows[0];
}

export async function deleteInvoiceFinancing(
  id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM trade_finance.invoice_financing WHERE invoice_id = $1 RETURNING invoice_id",
    [id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
