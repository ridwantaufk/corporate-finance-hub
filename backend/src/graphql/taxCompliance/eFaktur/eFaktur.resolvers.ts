import { PoolClient } from "pg";
import { EFaktur } from "./eFaktur.types";

export const eFakturResolvers = {
  Query: {
    async getEFakturById(
      _: any,
      { faktur_id }: { faktur_id: number },
      { db }: { db: PoolClient }
    ) {
      const result = await db.query(
        "SELECT * FROM tax_compliance.e_faktur WHERE faktur_id = $1",
        [faktur_id]
      );
      return result.rows[0] || null;
    },
    async getAllEFaktur(_: any, __: any, { db }: { db: PoolClient }) {
      const result = await db.query("SELECT * FROM tax_compliance.e_faktur");
      return result.rows;
    },
  },

  Mutation: {
    async createEFaktur(
      _: any,
      { input }: { input: EFaktur },
      { db }: { db: PoolClient }
    ) {
      const { client_id, amount, tax_rate, status } = input;
      const result = await db.query(
        `INSERT INTO tax_compliance.e_faktur (client_id, amount, tax_rate, status)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [client_id, amount, tax_rate, status]
      );
      return result.rows[0];
    },

    async updateEFaktur(
      _: any,
      { faktur_id, input }: { faktur_id: number; input: EFaktur },
      { db }: { db: PoolClient }
    ) {
      const { client_id, amount, tax_rate, status } = input;
      const result = await db.query(
        `UPDATE tax_compliance.e_faktur
         SET client_id = $1, amount = $2, tax_rate = $3, status = $4
         WHERE faktur_id = $5
         RETURNING *`,
        [client_id, amount, tax_rate, status, faktur_id]
      );
      return result.rows[0];
    },

    async deleteEFaktur(
      _: any,
      { faktur_id }: { faktur_id: number },
      { db }: { db: PoolClient }
    ) {
      const result = await db.query(
        "DELETE FROM tax_compliance.e_faktur WHERE faktur_id = $1 RETURNING faktur_id",
        [faktur_id]
      );
      return result.rowCount !== null && result.rowCount > 0;
    },
  },
};
