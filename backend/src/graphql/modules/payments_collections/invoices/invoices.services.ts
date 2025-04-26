import db from "@/config/db";
import { Invoice } from "./invoices.types";

export const getInvoiceById = async (
  invoice_id: number
): Promise<Invoice | null> => {
  const { rows } = await db.query(
    "SELECT * FROM payments_collections.invoices WHERE invoice_id = $1",
    [invoice_id]
  );
  return rows[0] || null;
};

export const getAllInvoices = async (): Promise<Invoice[]> => {
  const { rows } = await db.query(
    "SELECT * FROM payments_collections.invoices"
  );
  return rows;
};

export const createInvoice = async (
  client_id: number,
  amount: number,
  due_date: string,
  status: string
): Promise<Invoice> => {
  const { rows } = await db.query(
    "INSERT INTO payments_collections.invoices (client_id, amount, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [client_id, amount, due_date, status]
  );
  return rows[0];
};

export const updateInvoice = async (
  invoice_id: number,
  amount?: number,
  due_date?: string,
  status?: string
): Promise<Invoice | null> => {
  const { rows } = await db.query(
    `
      UPDATE payments_collections.invoices
      SET amount = COALESCE($2, amount),
          due_date = COALESCE($3, due_date),
          status = COALESCE($4, status)
      WHERE invoice_id = $1
      RETURNING *
    `,
    [invoice_id, amount, due_date, status]
  );
  return rows[0] || null;
};

export const deleteInvoice = async (invoice_id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM payments_collections.invoices WHERE invoice_id = $1",
    [invoice_id]
  );
  return rowCount !== 0;
};
