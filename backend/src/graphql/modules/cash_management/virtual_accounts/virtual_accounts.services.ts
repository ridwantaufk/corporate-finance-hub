import db from "@/config/db";
import { VirtualAccount } from "./virtual_accounts.types";

export const getVirtualAccountById = async (
  id: number
): Promise<VirtualAccount | null> => {
  const { rows } = await db.query(
    "SELECT * FROM virtual_accounts WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const getAllVirtualAccounts = async (): Promise<VirtualAccount[]> => {
  const { rows } = await db.query("SELECT * FROM virtual_accounts");
  return rows;
};

export const createVirtualAccount = async (
  account_number: string,
  balance: number,
  currency: string
): Promise<VirtualAccount> => {
  const { rows } = await db.query(
    "INSERT INTO virtual_accounts (account_number, balance, currency) VALUES ($1, $2, $3) RETURNING *",
    [account_number, balance, currency]
  );
  return rows[0];
};

export const updateVirtualAccount = async (
  id: number,
  account_number?: string,
  balance?: number,
  currency?: string
): Promise<VirtualAccount | null> => {
  const { rows } = await db.query(
    `
      UPDATE virtual_accounts
      SET account_number = COALESCE($2, account_number), 
          balance = COALESCE($3, balance),
          currency = COALESCE($4, currency)
      WHERE id = $1
      RETURNING *
    `,
    [id, account_number, balance, currency]
  );
  return rows[0] || null;
};

export const deleteVirtualAccount = async (id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM virtual_accounts WHERE id = $1",
    [id]
  );
  return rowCount !== 0;
};
