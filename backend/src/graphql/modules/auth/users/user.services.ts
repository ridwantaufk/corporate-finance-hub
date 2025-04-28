import db from "@/config/db";
import { User } from "./user.types";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/auth";

const saltRounds = 10;

export const loginUser = async (username: string, password: string) => {
  const { rows } = await db.query(
    "SELECT * FROM auth.users WHERE username = $1",
    [username]
  );

  if (!username) throw new Error("Username must be filled!");
  if (!password) throw new Error("Password must be filled!");

  const user = rows[0];
  if (!user) throw new Error("Username not found!");

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) throw new Error("Invalid password!");

  const payload = {
    userId: user.user_id,
    username: user.username,
    role: user.role,
  };

  const accessToken = generateToken(payload);

  return { accessToken, user };
};

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
  role: string,
  phone_number?: string,
  is_active: boolean = true
): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { rows } = await db.query(
      `INSERT INTO auth.users 
        (username, email, password_hash, role, phone_number, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [username, email, hashedPassword, role, phone_number, is_active]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error during user creation:", error);
    throw error;
  }
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
