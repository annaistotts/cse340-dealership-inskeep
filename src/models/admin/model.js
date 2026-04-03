import db from '../db.js';

async function getDashboardCounts() {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS user_count,
      (SELECT COUNT(*) FROM vehicles) AS vehicle_count,
      (SELECT COUNT(*) FROM reviews) AS review_count,
      (SELECT COUNT(*) FROM service_requests) AS service_request_count,
      (SELECT COUNT(*) FROM contact_messages) AS contact_message_count;
  `;

  const result = await db.query(sql);
  return result.rows[0];
}

async function getAllUsers() {
  const sql = `
    SELECT user_id, first_name, last_name, email, role, created_at
    FROM users
    ORDER BY created_at DESC;
  `;

  const result = await db.query(sql);
  return result.rows;
}

async function updateUserRole(userId, role) {
  const sql = `
    UPDATE users
    SET role = $1
    WHERE user_id = $2
    RETURNING user_id, first_name, last_name, email, role, created_at;
  `;

  const result = await db.query(sql, [role, userId]);
  return result.rows[0];
}

export default {
  getDashboardCounts,
  getAllUsers,
  updateUserRole,
};