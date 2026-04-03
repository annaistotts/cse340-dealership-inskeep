import db from '../db.js';

async function createServiceRequest({
  user_id,
  vehicle_year,
  vehicle_make,
  vehicle_model,
  service_type,
  request_description,
}) {
  const sql = `
    INSERT INTO service_requests
    (
      user_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      service_type,
      request_description,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, 'Submitted')
    RETURNING *;
  `;

  const result = await db.query(sql, [
    user_id,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    service_type,
    request_description,
  ]);

  return result.rows[0];
}

async function getRequestsByUserId(userId) {
  const sql = `
    SELECT *
    FROM service_requests
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await db.query(sql, [userId]);
  return result.rows;
}

export default {
  createServiceRequest,
  getRequestsByUserId,
};