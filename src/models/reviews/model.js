import db from '../db.js';

async function createReview({ vehicle_id, user_id, review_text, rating }) {
  const sql = `
    INSERT INTO reviews (vehicle_id, user_id, review_text, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await db.query(sql, [vehicle_id, user_id, review_text, rating]);
  return result.rows[0];
}

async function getReviewsByVehicleId(vehicleId) {
  const sql = `
    SELECT r.*, u.first_name, u.last_name
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    WHERE r.vehicle_id = $1
    ORDER BY r.created_at DESC;
  `;
  const result = await db.query(sql, [vehicleId]);
  return result.rows;
}

async function getReviewById(reviewId) {
  const sql = `
    SELECT *
    FROM reviews
    WHERE review_id = $1;
  `;
  const result = await db.query(sql, [reviewId]);
  return result.rows[0];
}

async function updateReview({ review_id, review_text, rating }) {
  const sql = `
    UPDATE reviews
    SET review_text = $1,
        rating = $2,
        updated_at = CURRENT_TIMESTAMP
    WHERE review_id = $3
    RETURNING *;
  `;
  const result = await db.query(sql, [review_text, rating, review_id]);
  return result.rows[0];
}

async function deleteReview(reviewId) {
  const sql = `
    DELETE FROM reviews
    WHERE review_id = $1;
  `;
  await db.query(sql, [reviewId]);
}

async function getAllReviewsForModeration() {
  const sql = `
    SELECT
      r.*,
      u.first_name,
      u.last_name,
      v.year,
      v.make,
      v.model,
      v.slug
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    JOIN vehicles v ON r.vehicle_id = v.vehicle_id
    ORDER BY r.created_at DESC;
  `;
  const result = await db.query(sql);
  return result.rows;
}

export default {
  createReview,
  getReviewsByVehicleId,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviewsForModeration,
};