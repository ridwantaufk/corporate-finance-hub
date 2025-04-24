import { PoolClient } from "pg";
import {
  IntercompanySettlement,
  CreateIntercompanySettlementInput,
} from "./intercompanySettlements.types";

export async function getIntercompanySettlements(
  db: PoolClient
): Promise<IntercompanySettlement[]> {
  const result = await db.query(
    "SELECT * FROM treasury_fx.intercompany_settlements ORDER BY settlement_date DESC"
  );
  return result.rows;
}

export async function getIntercompanySettlementById(
  id: number,
  db: PoolClient
): Promise<IntercompanySettlement | null> {
  const result = await db.query(
    "SELECT * FROM treasury_fx.intercompany_settlements WHERE settlement_id = $1",
    [id]
  );
  return result.rows[0] || null;
}

export async function createIntercompanySettlement(
  input: CreateIntercompanySettlementInput,
  db: PoolClient
): Promise<IntercompanySettlement> {
  const { sender_company, receiver_company, amount, status } = input;

  const result = await db.query(
    `INSERT INTO treasury_fx.intercompany_settlements
     (sender_company, receiver_company, amount, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [sender_company, receiver_company, amount, status]
  );

  return result.rows[0];
}

export async function updateIntercompanySettlement(
  id: number,
  input: CreateIntercompanySettlementInput,
  db: PoolClient
): Promise<IntercompanySettlement> {
  const { sender_company, receiver_company, amount, status } = input;

  const result = await db.query(
    `UPDATE treasury_fx.intercompany_settlements
     SET sender_company = $1, receiver_company = $2, amount = $3, status = $4
     WHERE settlement_id = $5
     RETURNING *`,
    [sender_company, receiver_company, amount, status, id]
  );

  return result.rows[0];
}

export async function deleteIntercompanySettlement(
  id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM treasury_fx.intercompany_settlements WHERE settlement_id = $1 RETURNING settlement_id",
    [id]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
