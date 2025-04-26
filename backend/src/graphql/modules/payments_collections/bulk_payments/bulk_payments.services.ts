import db from "@/config/db";
import { BulkPayment } from "./bulk_payments.types";

export const getBulkPaymentById = async (
  payment_id: number
): Promise<BulkPayment | null> => {
  const { rows } = await db.query(
    "SELECT * FROM payments_collections.bulk_payments WHERE payment_id = $1",
    [payment_id]
  );
  return rows[0] || null;
};

export const getAllBulkPayments = async (): Promise<BulkPayment[]> => {
  const { rows } = await db.query(
    "SELECT * FROM payments_collections.bulk_payments"
  );
  return rows;
};

export const createBulkPayment = async (
  sender_va_id: number,
  receiver_va_id: number,
  total_amount: number,
  status: string
): Promise<BulkPayment> => {
  const { rows } = await db.query(
    "INSERT INTO payments_collections.bulk_payments (sender_va_id, receiver_va_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [sender_va_id, receiver_va_id, total_amount, status]
  );
  return rows[0];
};

export const updateBulkPayment = async (
  payment_id: number,
  sender_va_id?: number,
  receiver_va_id?: number,
  total_amount?: number,
  status?: string
): Promise<BulkPayment | null> => {
  const { rows } = await db.query(
    `
      UPDATE payments_collections.bulk_payments
      SET sender_va_id = COALESCE($2, sender_va_id),
          receiver_va_id = COALESCE($3, receiver_va_id),
          total_amount = COALESCE($4, total_amount),
          status = COALESCE($5, status)
      WHERE payment_id = $1
      RETURNING *
    `,
    [payment_id, sender_va_id, receiver_va_id, total_amount, status]
  );
  return rows[0] || null;
};

export const deleteBulkPayment = async (
  payment_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM payments_collections.bulk_payments WHERE payment_id = $1",
    [payment_id]
  );
  return rowCount !== 0;
};
