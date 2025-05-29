import db from "@/config/db";
import { LoginResult, User, getUserWithId } from "./user.types";
import bcrypt from "bcrypt";
import { generateToken, generateTokenJwtRS256 } from "@/utils/auth";
import {
  createBiodata,
  getBiodataById,
  updateBiodata,
} from "@/graphql//modules/auth/biodata/biodata.services";

const saltRounds = 10;

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResult | null> => {
  console.log("password : ", typeof password, password);
  if (!username) throw new Error("Username must be filled!");
  if (!password) throw new Error("Password must be filled!");
  // console.log("masuk sini : ", typeof username, typeof password);
  const user = await getUserByUsernameOrEmail(username);
  console.log("user db : ", user);
  if (!user) throw new Error("Username or email not found!");

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) throw new Error("Invalid Password!");

  const biodata = await getBiodataById(user.biodata_id);

  if (!biodata) throw new Error("Biodata not found!");

  const payload = {
    user_id: user.user_id,
    username: user.username,
    role: user.role,
  };

  // // opsi 1
  // const accessToken = generateToken(payload);

  // opsi 2
  const accessToken = generateTokenJwtRS256(payload);

  const { password_hash, ...userWithoutPassword } = user;

  const userWithBiodata = {
    ...userWithoutPassword,
    biodata,
  };

  // console.log("userWithBiodata : ", userWithBiodata);

  return {
    accessToken,
    user: userWithBiodata,
  };
};

export const getUsers = async (): Promise<getUserWithId[]> => {
  const { rows } = await db.query("SELECT * FROM auth.users");
  return rows;
};

export const getUserById = async (
  user_id: number
): Promise<getUserWithId | null> => {
  const { rows } = await db.query(
    "SELECT * FROM auth.users WHERE user_id = $1",
    [user_id]
  );
  return rows[0] || null;
};

export const getUserByField = async (
  field: string,
  value: string | number
): Promise<getUserWithId | null> => {
  const { rows } = await db.query(
    `SELECT * FROM auth.users WHERE ${field} = $1`,
    [value]
  );

  return rows[0] || null;
};

export const getUserByUsernameOrEmail = async (
  usernameOrEmail: string
): Promise<getUserWithId | null> => {
  const { rows } = await db.query(
    `SELECT u.user_id, u.username, u.password_hash, u.role, u.is_active, u.biodata_id, u.created_at, u.updated_at FROM auth.users u JOIN auth.biodata b on u.biodata_id = b.biodata_id WHERE username = $1 OR b.email = $1`,
    [usernameOrEmail]
  );
  // console.log("rows[0] : ", rows[0]);
  return rows[0] || null;
};

export const createUser = async (
  username: string,
  password: string,
  role: string,
  is_active: boolean,
  biodata: {
    first_name: string;
    last_name: string;
    date_of_birth?: Date;
    gender?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    nationality?: string;
    marital_status?: string;
    occupation?: string;
  }
): Promise<void> => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // simpan biodata terlebih dahulu
    const returnBiodata = await createBiodata(
      biodata.first_name,
      biodata.last_name,
      biodata.date_of_birth,
      biodata.gender,
      biodata.email,
      biodata.phone,
      biodata.address,
      biodata.city,
      biodata.state,
      biodata.postal_code,
      biodata.country,
      biodata.nationality,
      biodata.marital_status,
      biodata.occupation
    );

    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await client.query(
      `INSERT INTO auth.users 
        (username, password_hash, role, is_active, biodata_id) 
       VALUES ($1, $2, $3, $4, $5)`,
      [username, hashedPassword, role, is_active, returnBiodata.biodata_id]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database error during user creation:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const updateUser = async (
  user_id: number,
  username?: string,
  password?: string,
  role?: string,
  is_active?: boolean,
  biodata?: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: Date;
    gender?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    nationality?: string;
    marital_status?: string;
    occupation?: string;
  }
): Promise<User> => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    let biodata_id: number | undefined;

    // Ambil biodata_id user saat ini
    const userRes = await client.query(
      `SELECT biodata_id FROM auth.users WHERE user_id = $1`,
      [user_id]
    );
    if (userRes.rows.length === 0) {
      throw new Error("User not found");
    }
    biodata_id = userRes.rows[0].biodata_id;

    if (biodata && biodata_id) {
      await updateBiodata(
        biodata_id,
        biodata.first_name,
        biodata.last_name,
        biodata.date_of_birth,
        biodata.gender,
        biodata.email,
        biodata.phone,
        biodata.address,
        biodata.city,
        biodata.state,
        biodata.postal_code,
        biodata.country,
        biodata.nationality,
        biodata.marital_status,
        biodata.occupation
      );
    }

    let hashedPassword: string | undefined = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const { rows } = await client.query(
      `
      UPDATE auth.users
      SET
        username = COALESCE($2, username),
        password_hash = COALESCE($3, password_hash),
        role = COALESCE($4, role),
        is_active = COALESCE($5, is_active),
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
      `,
      [user_id, username, hashedPassword, role, is_active]
    );

    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database error during user update:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const deleteUser = async (user_id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    "DELETE FROM auth.users WHERE user_id = $1",
    [user_id]
  );
  return rowCount !== 0;
};
