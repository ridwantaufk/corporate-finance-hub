import { PoolClient } from "pg";
import { BulkPaymentInput } from "./bulkPayments.types";

export async function getBulkPayments(db: PoolClient) {
  const result = await db.query(
    "SELECT * FROM payments_collections.bulk_payments"
  );
  return result.rows;
}

export async function getBulkPaymentById(payment_id: number, db: PoolClient) {
  const result = await db.query(
    "SELECT * FROM payments_collections.bulk_payments WHERE payment_id = $1",
    [payment_id]
  );
  return result.rows[0] || null;
}

export async function createBulkPayment(
  input: BulkPaymentInput,
  db: PoolClient
) {
  const { sender_va_id, receiver_va_id, total_amount, status } = input;

  const result = await db.query(
    `INSERT INTO payments_collections.bulk_payments 
    (sender_va_id, receiver_va_id, total_amount, status) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`,
    [sender_va_id, receiver_va_id, total_amount, status]
  );

  return result.rows[0];
}

export async function updateBulkPayment(
  payment_id: number,
  input: BulkPaymentInput,
  db: PoolClient
) {
  const { sender_va_id, receiver_va_id, total_amount, status } = input;

  const result = await db.query(
    `UPDATE payments_collections.bulk_payments 
    SET sender_va_id = $1, receiver_va_id = $2, total_amount = $3, status = $4, payment_date = CURRENT_TIMESTAMP
    WHERE payment_id = $5 
    RETURNING *`,
    [sender_va_id, receiver_va_id, total_amount, status, payment_id]
  );

  return result.rows[0];
}

export async function deleteBulkPayment(payment_id: number, db: PoolClient) {
  const result = await db.query(
    "DELETE FROM payments_collections.bulk_payments WHERE payment_id = $1 RETURNING payment_id",
    [payment_id]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
