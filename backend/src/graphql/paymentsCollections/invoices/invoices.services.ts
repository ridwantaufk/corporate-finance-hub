import { PoolClient } from "pg";
import { InvoiceInput } from "./invoices.types";

export async function getInvoices(db: PoolClient) {
  const result = await db.query("SELECT * FROM payments_collections.invoices");
  return result.rows;
}

export async function getInvoiceById(invoice_id: number, db: PoolClient) {
  const result = await db.query(
    "SELECT * FROM payments_collections.invoices WHERE invoice_id = $1",
    [invoice_id]
  );
  return result.rows[0] || null;
}

export async function createInvoice(input: InvoiceInput, db: PoolClient) {
  const { client_id, amount, due_date, status } = input;

  const result = await db.query(
    `INSERT INTO payments_collections.invoices 
    (client_id, amount, due_date, status) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`,
    [client_id, amount, due_date, status]
  );

  return result.rows[0];
}

export async function updateInvoice(
  invoice_id: number,
  input: InvoiceInput,
  db: PoolClient
) {
  const { client_id, amount, due_date, status } = input;

  const result = await db.query(
    `UPDATE payments_collections.invoices 
    SET client_id = $1, amount = $2, due_date = $3, status = $4
    WHERE invoice_id = $5 
    RETURNING *`,
    [client_id, amount, due_date, status, invoice_id]
  );

  return result.rows[0];
}

export async function deleteInvoice(invoice_id: number, db: PoolClient) {
  const result = await db.query(
    "DELETE FROM payments_collections.invoices WHERE invoice_id = $1 RETURNING invoice_id",
    [invoice_id]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
