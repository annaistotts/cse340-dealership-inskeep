import db from "../db.js";

async function getFeaturedVehicles() {
  try {
    const sql = `
      SELECT v.*, i.image_path
      FROM vehicles v
      LEFT JOIN vehicle_images i
        ON v.vehicle_id = i.vehicle_id
        AND i.is_primary = true
      WHERE v.featured = true
      ORDER BY v.vehicle_id;
    `;
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("getFeaturedVehicles error:", error);
    throw error;
  }
}

async function getAllVehicles() {
  try {
    const sql = `
      SELECT v.*, i.image_path
      FROM vehicles v
      LEFT JOIN vehicle_images i
        ON v.vehicle_id = i.vehicle_id
        AND i.is_primary = true
      ORDER BY v.vehicle_id;
    `;
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("getAllVehicles error:", error);
    throw error;
  }
}

async function getVehicleBySlug(slug) {
  try {
    const sql = `
      SELECT v.*, i.image_path
      FROM vehicles v
      LEFT JOIN vehicle_images i
        ON v.vehicle_id = i.vehicle_id
        AND i.is_primary = true
      WHERE v.slug = $1;
    `;
    const result = await db.query(sql, [slug]);
    return result.rows[0];
  } catch (error) {
    console.error("getVehicleBySlug error:", error);
    throw error;
  }
}

async function getVehicleById(vehicleId) {
  try {
    const sql = `
      SELECT v.*, i.image_path
      FROM vehicles v
      LEFT JOIN vehicle_images i
        ON v.vehicle_id = i.vehicle_id
        AND i.is_primary = true
      WHERE v.vehicle_id = $1;
    `;
    const result = await db.query(sql, [vehicleId]);
    return result.rows[0];
  } catch (error) {
    console.error("getVehicleById error:", error);
    throw error;
  }
}

async function updateVehicleDetails({ vehicle_id, price, description, availability }) {
  try {
    const sql = `
      UPDATE vehicles
      SET price = $1,
          description = $2,
          availability = $3
      WHERE vehicle_id = $4
      RETURNING *;
    `;
    const result = await db.query(sql, [price, description, availability, vehicle_id]);
    return result.rows[0];
  } catch (error) {
    console.error("updateVehicleDetails error:", error);
    throw error;
  }
}

async function getAllCategories() {
  const sql = `
    SELECT *
    FROM categories
    ORDER BY category_name;
  `;

  const result = await db.query(sql);
  return result.rows;
}

async function getVehiclesByCategoryId(categoryId) {
  const sql = `
    SELECT v.*, i.image_path, c.category_name
    FROM vehicles v
    JOIN categories c ON v.category_id = c.category_id
    LEFT JOIN vehicle_images i
      ON v.vehicle_id = i.vehicle_id
      AND i.is_primary = true
    WHERE v.category_id = $1
    ORDER BY v.vehicle_id;
  `;

  const result = await db.query(sql, [categoryId]);
  return result.rows;
}

async function getCategoryById(categoryId) {
  const sql = `
    SELECT *
    FROM categories
    WHERE category_id = $1;
  `;

  const result = await db.query(sql, [categoryId]);
  return result.rows[0];
}

export default {
  getFeaturedVehicles,
  getAllVehicles,
  getVehicleBySlug,
  getVehicleById,
  updateVehicleDetails,
  getAllCategories,
  getVehiclesByCategoryId,
  getCategoryById,
};