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

async function getAllServiceRequests() {
  const sql = `
    SELECT sr.*, u.first_name, u.last_name, u.email
    FROM service_requests sr
    JOIN users u ON sr.user_id = u.user_id
    ORDER BY sr.created_at DESC;
  `;

  const result = await db.query(sql);
  return result.rows;
}

async function getServiceRequestById(requestId) {
  const sql = `
    SELECT sr.*, u.first_name, u.last_name, u.email
    FROM service_requests sr
    JOIN users u ON sr.user_id = u.user_id
    WHERE sr.request_id = $1;
  `;

  const result = await db.query(sql, [requestId]);
  return result.rows[0];
}

async function updateServiceRequest({
  request_id,
  status,
  employee_notes,
}) {
  const sql = `
    UPDATE service_requests
    SET status = $1,
        employee_notes = $2,
        updated_at = CURRENT_TIMESTAMP
    WHERE request_id = $3
    RETURNING *;
  `;

  const result = await db.query(sql, [
    status,
    employee_notes || null,
    request_id,
  ]);

  return result.rows[0];
}

export default {
  createServiceRequest,
  getRequestsByUserId,
  getAllServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
};