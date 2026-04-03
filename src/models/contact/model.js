import db from '../db.js';

async function createContactMessage({
  name,
  email,
  subject,
  message,
}) {
  const sql = `
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await db.query(sql, [name, email, subject || null, message]);
  return result.rows[0];
}

async function getAllContactMessages() {
  const sql = `
    SELECT *
    FROM contact_messages
    ORDER BY created_at DESC;
  `;

  const result = await db.query(sql);
  return result.rows;
}

export default {
  createContactMessage,
  getAllContactMessages,
};