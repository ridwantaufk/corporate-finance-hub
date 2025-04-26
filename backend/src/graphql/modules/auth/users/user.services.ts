import db from "@/config/db";
import { User } from "./user.types";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const getUsers = async (): Promise<User[]> => {
  const { rows } = await db.query("SELECT * FROM auth.users");
  return rows;
};

export const getUserById = async (user_id: number): Promise<User | null> => {
  const { rows } = await db.query(
    "SELECT * FROM auth.users WHERE user_id = $1",
    [user_id]
  );
  return rows[0] || null;
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  role: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const { rows } = await db.query(
    "INSERT INTO auth.users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashedPassword, role]
  );
  return rows[0];
};

export const updateUser = async (
  user_id: number,
  username?: string,
  email?: string,
  password?: string,
  role?: string,
  phone_number?: string,
  is_active?: boolean
): Promise<User> => {
  // Jika password diupdate, hash terlebih dahulu
  const hashedPassword = password
    ? await bcrypt.hash(password, saltRounds)
    : undefined;

  const { rows } = await db.query(
    `
    UPDATE auth.users
    SET username = COALESCE($2, username),
        email = COALESCE($3, email),
        password_hash = COALESCE($4, password_hash),
        role = COALESCE($5, role),
        phone_number = COALESCE($6, phone_number),
        is_active = COALESCE($7, is_active),
        updated_at = NOW()
    WHERE user_id = $1
    RETURNING *
    `,
    [
      user_id,
      username,
      email,
      hashedPassword || undefined,
      role,
      phone_number,
      is_active,
    ]
  );
  return rows[0];
};

export const deleteUser = async (user_id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM auth.users WHERE user_id = $1",
    [user_id]
  );
  return rowCount !== 0;
};
