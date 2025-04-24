import { PoolClient } from "pg";
import {
  LetterOfCredit,
  CreateLetterOfCreditInput,
} from "./letterOfCredit.types";

export async function getLetterOfCredits(
  db: PoolClient
): Promise<LetterOfCredit[]> {
  const result = await db.query("SELECT * FROM trade_finance.letter_of_credit");
  return result.rows;
}

export async function getLetterOfCreditById(
  id: number,
  db: PoolClient
): Promise<LetterOfCredit | null> {
  const result = await db.query(
    "SELECT * FROM trade_finance.letter_of_credit WHERE lc_id = $1",
    [id]
  );
  return result.rows[0] || null;
}

export async function createLetterOfCredit(
  input: CreateLetterOfCreditInput,
  db: PoolClient
): Promise<LetterOfCredit> {
  const { client_id, amount, issue_date, expiry_date, status } = input;
  const result = await db.query(
    `INSERT INTO trade_finance.letter_of_credit (client_id, amount, issue_date, expiry_date, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [client_id, amount, issue_date, expiry_date, status]
  );
  return result.rows[0];
}

export async function updateLetterOfCredit(
  id: number,
  input: CreateLetterOfCreditInput,
  db: PoolClient
): Promise<LetterOfCredit> {
  const { client_id, amount, issue_date, expiry_date, status } = input;
  const result = await db.query(
    `UPDATE trade_finance.letter_of_credit
     SET client_id = $1, amount = $2, issue_date = $3, expiry_date = $4, status = $5
     WHERE lc_id = $6
     RETURNING *`,
    [client_id, amount, issue_date, expiry_date, status, id]
  );
  return result.rows[0];
}

export async function deleteLetterOfCredit(
  id: number,
  db: PoolClient
): Promise<boolean> {
  const result = await db.query(
    "DELETE FROM trade_finance.letter_of_credit WHERE lc_id = $1 RETURNING lc_id",
    [id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
