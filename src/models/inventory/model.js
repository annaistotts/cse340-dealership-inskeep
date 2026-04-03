import db from "../db.js";

const sortMap = {
  newest: 'v.year DESC, v.vehicle_id DESC',
  oldest: 'v.year ASC, v.vehicle_id ASC',
  price_desc: 'v.price DESC, v.vehicle_id DESC',
  price_asc: 'v.price ASC, v.vehicle_id ASC',
  mileage_desc: 'v.mileage DESC, v.vehicle_id DESC',
  mileage_asc: 'v.mileage ASC, v.vehicle_id ASC',
  year_desc: 'v.year DESC, v.vehicle_id DESC',
  year_asc: 'v.year ASC, v.vehicle_id ASC',
};

const statusMap = {
  available: 'available',
  pending: 'pending',
  sold: 'sold',
};

function getSortOrder(sortBy) {
  return sortMap[sortBy] || sortMap.newest;
}

function getStatusFilter(status) {
  return statusMap[status] || null;
}

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

async function getAllVehicles(sortBy = 'newest', status = null) {
  try {
    const orderBy = getSortOrder(sortBy);
    const statusFilter = getStatusFilter(status);
    let sql = `
      SELECT v.*, i.image_path
      FROM vehicles v
      LEFT JOIN vehicle_images i
        ON v.vehicle_id = i.vehicle_id
        AND i.is_primary = true
    `;
    if (statusFilter) {
      sql += ` WHERE v.availability = $1`;
    }
    sql += ` ORDER BY ${orderBy};`;
    const result = statusFilter ? await db.query(sql, [statusFilter]) : await db.query(sql);
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
  const sql = `
    SELECT *
    FROM vehicles
    WHERE vehicle_id = $1;
  `;
  const result = await db.query(sql, [vehicleId]);
  return result.rows[0];
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

async function getVehiclesByCategoryId(categoryId, sortBy = 'newest', status = null) {
  const orderBy = getSortOrder(sortBy);
  const statusFilter = getStatusFilter(status);
  let sql = `
    SELECT v.*, i.image_path, c.category_name
    FROM vehicles v
    JOIN categories c ON v.category_id = c.category_id
    LEFT JOIN vehicle_images i
      ON v.vehicle_id = i.vehicle_id
      AND i.is_primary = true
    WHERE v.category_id = $1
  `;
  if (statusFilter) {
    sql += ` AND v.availability = $2`;
  }
  sql += ` ORDER BY ${orderBy};`;

  const result = statusFilter ? await db.query(sql, [categoryId, statusFilter]) : await db.query(sql, [categoryId]);
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

async function createCategory(categoryName) {
  const sql = `
    INSERT INTO categories (category_name)
    VALUES ($1)
    RETURNING *;
  `;

  const result = await db.query(sql, [categoryName]);
  return result.rows[0];
}

async function updateCategory(categoryId, categoryName) {
  const sql = `
    UPDATE categories
    SET category_name = $1
    WHERE category_id = $2
    RETURNING *;
  `;

  const result = await db.query(sql, [categoryName, categoryId]);
  return result.rows[0];
}

async function deleteCategory(categoryId) {
  const sql = `
    DELETE FROM categories
    WHERE category_id = $1;
  `;

  await db.query(sql, [categoryId]);
}

async function createVehicle({
  category_id,
  year,
  make,
  model,
  slug,
  price,
  mileage,
  transmission,
  fuel_type,
  description,
  availability,
  featured,
}) {
  const sql = `
    INSERT INTO vehicles (
      category_id,
      year,
      make,
      model,
      slug,
      price,
      mileage,
      transmission,
      fuel_type,
      description,
      availability,
      featured
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
  `;

  const result = await db.query(sql, [
    category_id,
    year,
    make,
    model,
    slug,
    price,
    mileage,
    transmission,
    fuel_type,
    description,
    availability,
    featured,
  ]);

  return result.rows[0];
}

async function updateVehicle(vehicleId, {
  category_id,
  year,
  make,
  model,
  slug,
  price,
  mileage,
  transmission,
  fuel_type,
  description,
  availability,
  featured,
}) {
  const sql = `
    UPDATE vehicles
    SET category_id = $1,
        year = $2,
        make = $3,
        model = $4,
        slug = $5,
        price = $6,
        mileage = $7,
        transmission = $8,
        fuel_type = $9,
        description = $10,
        availability = $11,
        featured = $12
    WHERE vehicle_id = $13
    RETURNING *;
  `;

  const result = await db.query(sql, [
    category_id,
    year,
    make,
    model,
    slug,
    price,
    mileage,
    transmission,
    fuel_type,
    description,
    availability,
    featured,
    vehicleId,
  ]);

  return result.rows[0];
}

async function deleteVehicle(vehicleId) {
  const sql = `
    DELETE FROM vehicles
    WHERE vehicle_id = $1;
  `;
  await db.query(sql, [vehicleId]);
}

export default {
  getFeaturedVehicles,
  getAllVehicles,
  getVehicleBySlug,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleDetails,
  getAllCategories,
  getVehiclesByCategoryId,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};