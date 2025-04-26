import db from "@/config/db";
import {
  IntercompanySettlement,
  IntercompanySettlementInput,
  IntercompanySettlementUpdateInput,
} from "./intercompany_settlements.types";

export const createIntercompanySettlement = async (
  input: IntercompanySettlementInput
): Promise<IntercompanySettlement> => {
  const result = await db.query(
    `INSERT INTO treasury_fx.intercompany_settlements (sender_company, receiver_company, amount, status)
         VALUES ($1, $2, $3, $4) RETURNING *`,
    [input.sender_company, input.receiver_company, input.amount, input.status]
  );
  return result.rows[0];
};

export const getAllIntercompanySettlements = async (): Promise<
  IntercompanySettlement[]
> => {
  const result = await db.query(
    `SELECT * FROM treasury_fx.intercompany_settlements`
  );
  return result.rows;
};

export const getIntercompanySettlementById = async (
  settlement_id: number
): Promise<IntercompanySettlement | null> => {
  const result = await db.query(
    `SELECT * FROM treasury_fx.intercompany_settlements WHERE settlement_id = $1`,
    [settlement_id]
  );
  return result.rows[0] || null;
};

export const updateIntercompanySettlement = async (
  settlement_id: number,
  input: IntercompanySettlementUpdateInput
): Promise<IntercompanySettlement | null> => {
  const fields = Object.keys(input);
  if (fields.length === 0) return null;

  const setQuery = fields
    .map((field, idx) => `${field} = $${idx + 2}`)
    .join(", ");
  const values = [settlement_id, ...Object.values(input)];

  const result = await db.query(
    `UPDATE treasury_fx.intercompany_settlements SET ${setQuery} WHERE settlement_id = $1 RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteIntercompanySettlement = async (
  settlement_id: number
): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM treasury_fx.intercompany_settlements WHERE settlement_id = $1`,
    [settlement_id]
  );
  return rowCount !== 0;
};
