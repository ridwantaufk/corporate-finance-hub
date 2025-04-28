import db from "./db";

import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  try {
    await db.query("SELECT NOW()");
    console.log("Database connected !");
  } catch (err) {
    console.error("Database connection error : ", err);
  }
}

testConnection();
