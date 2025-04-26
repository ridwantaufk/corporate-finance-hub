import db from "@/config/db";
import {
  InvoiceFinancing,
  InvoiceFinancingInput,
  InvoiceFinancingUpdateInput,
} from "./invoice_financing.types";

export const createInvoiceFinancing = async (
  input: InvoiceFinancingInput
): Promise<InvoiceFinancing> => {
  const result = await db.query(
    `INSERT INTO trade_finance.invoice_financing (client_id, amount, financing_status)
         VALUES ($1, $2, $3) RETURNING *`,
    [input.client_id, input.amount, input.financing_status]
  );
  return result.rows[0];
};

export const getAllInvoiceFinancings = async (): Promise<
  InvoiceFinancing[]
> => {
  const result = await db.query(
    `SELECT * FROM trade_finance.invoice_financing`
  );
  return result.rows;
};

export const getInvoiceFinancingById = async (
  invoice_id: number
): Promise<InvoiceFinancing | null> => {
  const result = await db.query(
    `SELECT * FROM trade_finance.invoice_financing WHERE invoice_id = $1`,
    [invoice_id]
  );
  return result.rows[0] || null;
};

export const updateInvoiceFinancing = async (
  invoice_id: number,
  input: InvoiceFinancingUpdateInput
): Promise<InvoiceFinancing | null> => {
  const fields = Object.keys(input);
  if (fields.length === 0) return null;

  const setQuery = fields
    .map((field, idx) => `${field} = $${idx + 2}`)
    .join(", ");
  const values = [invoice_id, ...Object.values(input)];

  const result = await db.query(
    `UPDATE trade_finance.invoice_financing SET ${setQuery} WHERE invoice_id = $1 RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteInvoiceFinancing = async (
  invoice_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM trade_finance.invoice_financing WHERE invoice_id = $1`,
    [invoice_id]
  );
  return rowCount !== 0;
};
