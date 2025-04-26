import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

const connectToDatabase = async () => {
  try {
    await db.connect();
    console.log("Berhasil terhubung ke database");
  } catch (error) {
    console.error("Gagal terhubung ke database:", error);
  }
};

connectToDatabase();

export default db;
