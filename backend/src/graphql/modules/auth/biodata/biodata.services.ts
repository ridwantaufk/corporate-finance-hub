import db from "@/config/db";
import {
  Biodata,
  CreateBiodata,
  UpdateBiodata,
  getBiodataWithId,
} from "./biodata.types";

export const getBiodataById = async (
  biodata_id: number
): Promise<getBiodataWithId> => {
  const client = await db.connect();

  try {
    const { rows } = await client.query(
      `SELECT * FROM auth.biodata WHERE biodata_id = $1`,
      [biodata_id]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Database error during getBiodataById:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const getBiodataByField = async (
  field: string,
  value: string | number
): Promise<getBiodataWithId | null> => {
  const client = await db.connect();

  try {
    const query = `SELECT * FROM auth.biodata WHERE ${field} = $1 LIMIT 1`;
    const { rows } = await client.query(query, [value]);

    return rows[0] || null;
  } catch (error) {
    console.error("Database error during searchBiodataByField:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const getBiodatas = async (): Promise<Biodata[]> => {
  const client = await db.connect();

  try {
    const { rows } = await client.query(`SELECT * FROM auth.biodata`);

    return rows;
  } catch (error) {
    console.error("Database error during getBiodatas:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const createBiodata = async (
  first_name: string,
  last_name: string,
  date_of_birth?: Date,
  gender?: string,
  email?: string,
  phone?: string,
  address?: string,
  city?: string,
  state?: string,
  postal_code?: string,
  country?: string,
  nationality?: string,
  marital_status?: string,
  occupation?: string,
  profile_picture?: string
): Promise<CreateBiodata> => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `INSERT INTO auth.biodata 
        (first_name, last_name, email, date_of_birth, gender, phone, address, city, state, postal_code, country, nationality, marital_status, occupation) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
       RETURNING *`,
      [
        first_name,
        last_name,
        email,
        date_of_birth,
        gender,
        phone,
        address,
        city,
        state,
        postal_code,
        country,
        nationality,
        marital_status,
        occupation,
        profile_picture,
      ]
    );

    await client.query("COMMIT");

    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database error during biodata creation:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const updateBiodata = async (
  biodata_id: number,
  first_name?: string,
  last_name?: string,
  date_of_birth?: Date,
  gender?: string,
  email?: string,
  phone?: string,
  address?: string,
  city?: string,
  state?: string,
  postal_code?: string,
  country?: string,
  nationality?: string,
  marital_status?: string,
  occupation?: string,
  profile_picture?: string
): Promise<UpdateBiodata> => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `UPDATE auth.biodata
        SET first_name = $2,
            last_name = $3,
            date_of_birth = $4,
            gender = $5,
            email = $6,
            phone = $7,
            address = $8,
            city = $9,
            state = $10,
            postal_code = $11,
            country = $12,
            nationality = $13,
            marital_status = $14,
            occupation = $15,
            profile_picture = $16,
            updated_at = NOW()
        WHERE biodata_id = $1
        RETURNING *`,
      [
        biodata_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone,
        address,
        city,
        state,
        postal_code,
        country,
        nationality,
        marital_status,
        occupation,
        profile_picture,
      ]
    );

    await client.query("COMMIT");

    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database error during biodata update:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const deleteBiodataById = async (
  biodata_id: number
): Promise<boolean> => {
  const client = await db.connect();

  try {
    const result = await client.query(
      `DELETE FROM auth.biodata WHERE biodata_id = $1`,
      [biodata_id]
    );

    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error("Database error during deleteBiodataById:", error);
    throw error;
  } finally {
    client.release();
  }
};
