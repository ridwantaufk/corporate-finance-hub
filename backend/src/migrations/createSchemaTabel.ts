import fs from "fs";
import path from "path";
import db from "@/config/db";

const runMigrations = async () => {
  const sql = fs
    .readFileSync(path.join(__dirname, "migrations", "createSchema.sql"))
    .toString();
  try {
    await db.query(sql);
    console.log("Schema created!");
  } catch (err) {
    console.error("Error creating schema:", err);
  } finally {
    db.end();
  }
};

runMigrations();
