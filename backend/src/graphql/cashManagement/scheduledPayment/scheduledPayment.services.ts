import { PoolClient } from "pg";
import { ScheduledPayment } from "./scheduledPayment.types";

export async function getScheduledPayments(
  db: PoolClient
): Promise<ScheduledPayment[]> {
  const result = await db.query(
    "SELECT * FROM cash_management.scheduled_payments"
  );
  return result.rows;
}

export async function createScheduledPayment(
  input: ScheduledPayment,
  db: PoolClient
): Promise<ScheduledPayment> {
  const { va_id, amount, due_date, status } = input;

  const result = await db.query(
    `INSERT INTO cash_management.scheduled_payments (va_id, amount, due_date, status) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [va_id, amount, due_date, status]
  );

  return result.rows[0];
}

export async function updateScheduledPayment(
  payment_id: number,
  input: ScheduledPayment,
  db: PoolClient
): Promise<ScheduledPayment> {
  const { va_id, amount, due_date, status } = input;

  const result = await db.query(
    `UPDATE cash_management.scheduled_payments 
     SET va_id = $1, amount = $2, due_date = $3, status = $4, updated_at = CURRENT_TIMESTAMP 
     WHERE payment_id = $5 
     RETURNING *`,
    [va_id, amount, due_date, status, payment_id]
  );

  return result.rows[0];
}

export async function deleteScheduledPayment(
  payment_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM cash_management.scheduled_payments WHERE payment_id = $1 RETURNING payment_id",
    [payment_id]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
