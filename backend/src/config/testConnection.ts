// src/config/testConnection.ts
import db from "./db";

async function testConnection() {
  try {
    await db.query("SELECT NOW()");
    console.log("✅ Database connected!");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
}

testConnection();
