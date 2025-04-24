import { PoolClient } from "pg";
import { UserInput, User } from "./user.types";

export async function createUser(
  input: UserInput,
  db: PoolClient
): Promise<User> {
  const {
    username,
    password_hash,
    email,
    phone_number,
    role,
    is_active = true,
  } = input;

  const result = await db.query(
    `INSERT INTO auth.users (username, password_hash, email, phone_number, role, is_active) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [username, password_hash, email, phone_number, role, is_active]
  );

  return result.rows[0];
}

export async function getUser(
  user_id: number,
  db: PoolClient
): Promise<User | null> {
  const result = await db.query("SELECT * FROM auth.users WHERE user_id = $1", [
    user_id,
  ]);

  return result.rows[0] || null;
}

export async function getUsers(db: PoolClient): Promise<User[]> {
  const result = await db.query("SELECT * FROM auth.users");
  return result.rows;
}
