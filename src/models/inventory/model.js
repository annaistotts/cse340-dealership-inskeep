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

export default {
  getFeaturedVehicles,
  getAllVehicles,
  getVehicleBySlug,
};