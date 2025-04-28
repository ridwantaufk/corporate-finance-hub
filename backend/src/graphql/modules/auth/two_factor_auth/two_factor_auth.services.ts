import db from "@/config/db";
import { TwoFactorAuth } from "./two_factor_auth.types";

export const getTwoFactorAuthByUserId = async (
  user_id: number
): Promise<TwoFactorAuth | null> => {
  const { rows } = await db.query(
    "SELECT * FROM two_factor_auth WHERE user_id = $1",
    [user_id]
  );
  return rows[0] || null;
};

export const enableTwoFactorAuth = async (
  user_id: number
): Promise<TwoFactorAuth> => {
  const secret = "some-generated-secret";

  const { rows } = await db.query(
    "INSERT INTO two_factor_auth (user_id, secret, is_enabled) VALUES ($1, $2, true) RETURNING *",
    [user_id, secret]
  );
  return rows[0];
};

export const disableTwoFactorAuth = async (
  user_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM two_factor_auth WHERE user_id = $1",
    [user_id]
  );
  return rowCount !== 0;
};
