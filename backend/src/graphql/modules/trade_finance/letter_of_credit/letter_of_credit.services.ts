import db from "@/config/db";
import {
  LetterOfCredit,
  LetterOfCreditInput,
  LetterOfCreditUpdateInput,
} from "./letter_of_credit.types";

export const createLetterOfCredit = async (
  input: LetterOfCreditInput
): Promise<LetterOfCredit> => {
  const result = await db.query(
    `INSERT INTO trade_finance.letter_of_credit (client_id, amount, issue_date, expiry_date, status)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      input.client_id,
      input.amount,
      input.issue_date,
      input.expiry_date,
      input.status,
    ]
  );
  return result.rows[0];
};

export const getAllLetterOfCredits = async (): Promise<LetterOfCredit[]> => {
  const result = await db.query(`SELECT * FROM trade_finance.letter_of_credit`);
  return result.rows;
};

export const getLetterOfCreditById = async (
  lc_id: number
): Promise<LetterOfCredit | null> => {
  const result = await db.query(
    `SELECT * FROM trade_finance.letter_of_credit WHERE lc_id = $1`,
    [lc_id]
  );
  return result.rows[0] || null;
};

export const updateLetterOfCredit = async (
  lc_id: number,
  input: LetterOfCreditUpdateInput
): Promise<LetterOfCredit | null> => {
  const fields = Object.keys(input);
  if (fields.length === 0) return null;

  const setQuery = fields
    .map((field, idx) => `${field} = $${idx + 2}`)
    .join(", ");
  const values = [lc_id, ...Object.values(input)];

  const result = await db.query(
    `UPDATE trade_finance.letter_of_credit SET ${setQuery} WHERE lc_id = $1 RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

export const deleteLetterOfCredit = async (lc_id: number): Promise<boolean> => {
  const { rowCount } = await db.query(
    `DELETE FROM trade_finance.letter_of_credit WHERE lc_id = $1`,
    [lc_id]
  );

  return rowCount !== 0;
};
