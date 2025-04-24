import { Pool } from "pg";

export interface Context {
  db: Pool;
}
