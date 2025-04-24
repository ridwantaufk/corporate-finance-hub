import { PoolClient } from "pg";
import { TwoFactorAuthInput, TwoFactorAuth } from "./twoFactorAuth.types";

export async function enableTwoFactorAuth(
  input: TwoFactorAuthInput,
  db: PoolClient
): Promise<TwoFactorAuth> {
  const { user_id, secret_key, is_enabled = true } = input;

  const result = await db.query(
    `INSERT INTO auth.two_factor_auth (user_id, secret_key, is_enabled) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (user_id) 
     DO UPDATE SET secret_key = $2, is_enabled = $3, updated_at = CURRENT_TIMESTAMP 
     RETURNING *`,
    [user_id, secret_key, is_enabled]
  );

  return result.rows[0];
}

export async function getTwoFactorAuth(
  user_id: number,
  db: PoolClient
): Promise<TwoFactorAuth | null> {
  const result = await db.query(
    "SELECT * FROM auth.two_factor_auth WHERE user_id = $1",
    [user_id]
  );

  return result.rows[0] || null;
}
