// src/graphql/modules/cash_management/scheduled_payments/scheduled_payment.service.ts
import db from "@/config/db";
import { ScheduledPayment } from "./scheduled_payments.types";

export const getScheduledPaymentById = async (
  id: number
): Promise<ScheduledPayment | null> => {
  const { rows } = await db.query(
    "SELECT * FROM scheduled_payments WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const getAllScheduledPayments = async (): Promise<
  ScheduledPayment[]
> => {
  const { rows } = await db.query("SELECT * FROM scheduled_payments");
  return rows;
};

export const createScheduledPayment = async (
  virtual_account_id: number,
  amount: number,
  payment_date: string,
  status: string
): Promise<ScheduledPayment> => {
  const { rows } = await db.query(
    "INSERT INTO scheduled_payments (virtual_account_id, amount, payment_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [virtual_account_id, amount, payment_date, status]
  );
  return rows[0];
};

export const updateScheduledPayment = async (
  id: number,
  amount?: number,
  payment_date?: string,
  status?: string
): Promise<ScheduledPayment | null> => {
  const { rows } = await db.query(
    `
      UPDATE scheduled_payments
      SET amount = COALESCE($2, amount), 
          payment_date = COALESCE($3, payment_date),
          status = COALESCE($4, status)
      WHERE id = $1
      RETURNING *
    `,
    [id, amount, payment_date, status]
  );
  return rows[0] || null;
};

export const deleteScheduledPayment = async (id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM scheduled_payments WHERE id = $1",
    [id]
  );
  return rowCount !== 0;
};
