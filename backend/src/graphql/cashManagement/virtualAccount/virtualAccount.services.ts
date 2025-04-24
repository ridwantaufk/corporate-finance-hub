import { PoolClient } from "pg";
import { VirtualAccount } from "./virtualAccount.types";

// Fungsi untuk mendapatkan semua virtual account
export async function getVirtualAccounts(
  db: PoolClient
): Promise<VirtualAccount[]> {
  const result = await db.query(
    "SELECT * FROM cash_management.virtual_accounts"
  );
  return result.rows;
}

// Fungsi untuk mendapatkan virtual account berdasarkan ID
export async function getVirtualAccountById(
  va_id: number,
  db: PoolClient
): Promise<VirtualAccount | null> {
  const result = await db.query(
    "SELECT * FROM cash_management.virtual_accounts WHERE va_id = $1",
    [va_id]
  );
  return result.rows[0] || null;
}

// Fungsi untuk membuat virtual account
export async function createVirtualAccount(
  input: VirtualAccount,
  db: PoolClient
): Promise<VirtualAccount> {
  const { user_id, account_number, currency } = input;

  const result = await db.query(
    `INSERT INTO cash_management.virtual_accounts (user_id, account_number, currency) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [user_id, account_number, currency]
  );

  return result.rows[0];
}

// Fungsi untuk memperbarui virtual account
export async function updateVirtualAccount(
  va_id: number,
  input: VirtualAccount,
  db: PoolClient
): Promise<VirtualAccount> {
  const { user_id, account_number, currency } = input;

  const result = await db.query(
    `UPDATE cash_management.virtual_accounts 
     SET user_id = $1, account_number = $2, currency = $3, updated_at = CURRENT_TIMESTAMP 
     WHERE va_id = $4 
     RETURNING *`,
    [user_id, account_number, currency, va_id]
  );

  return result.rows[0];
}

// Fungsi untuk menghapus virtual account
export async function deleteVirtualAccount(
  va_id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM cash_management.virtual_accounts WHERE va_id = $1 RETURNING va_id",
    [va_id]
  );

  // Cek jika ada baris yang terhapus berdasarkan rowCount
  return result.rowCount !== null && result.rowCount > 0;
}
