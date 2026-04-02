import db from '../db.js';

async function getUserByEmail(email) {
  const result = await db.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

async function createUser(user) {
  const result = await db.query(
    `INSERT INTO users (first_name, last_name, email, password, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      'customer',
    ]
  );
  return result.rows[0];
}

export default {
  getUserByEmail,
  createUser,
};