import inventoryModel from '../../models/inventory/model.js';
import reviewModel from '../../models/reviews/model.js';

const allowedSorts = new Set([
  'newest',
  'oldest',
  'price_desc',
  'price_asc',
  'mileage_desc',
  'mileage_asc',
  'year_desc',
  'year_asc',
]);

const allowedStatuses = new Set([
  'available',
  'pending',
  'sold',
]);

function getSelectedSort(sort) {
  if (allowedSorts.has(sort)) return sort;
  return 'newest';
}

function getSelectedStatus(status) {
  if (status && allowedStatuses.has(status)) return status;
  return null;
}

const highlights = [
  {
    title: 'Transparent pricing',
    copy: 'Straightforward vehicle details and pricing with no guesswork.',
  },
  {
    title: 'Quality you can trust',
    copy: 'Every vehicle is reviewed for reliability, comfort, and daily performance.',
  },
  {
    title: 'Friendly buying experience',
    copy: 'Browse, compare, and schedule a visit with a process built around drivers.',
  },
];

function buildHomeViewModel(featuredVehicles) {
  return {
    title: 'Home',
    hero: {
      eyebrow: 'Used cars made easy',
      heading: 'A better place to find your next dependable vehicle.',
      copy: 'Driven Dealership brings together clean listings, honest information, and a polished shopping experience.',
    },
    highlights,
    featuredVehicles,
  };
}

export async function buildHome(req, res, next) {
  try {
    const featuredVehicles = await inventoryModel.getFeaturedVehicles();
    res.render('inventory/home', buildHomeViewModel(featuredVehicles));
  } catch (error) {
    next(error);
  }
}

export async function buildInventory(req, res, next) {
  try {
    const selectedSort = getSelectedSort(req.query.sort);
    const selectedStatus = getSelectedStatus(req.query.status);
    const vehicles = await inventoryModel.getAllVehicles(selectedSort, selectedStatus);
    res.render('inventory/list', {
      title: 'Inventory',
      vehicles,
      categoryName: 'All Vehicles',
      selectedSort,
      selectedStatus,
    });
  } catch (error) {
    next(error);
  }
}

export async function buildVehicleDetail(req, res, next) {
  try {
    const vehicle = await inventoryModel.getVehicleBySlug(req.params.slug);

    if (!vehicle) {
      return res.status(404).render('inventory/detail', {
        title: 'Vehicle Not Found',
        vehicle: null,
        reviews: [],
      });
    }

    const reviews = await reviewModel.getReviewsByVehicleId(vehicle.vehicle_id);

    return res.render('inventory/detail', {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      vehicle,
      reviews,
    });
  } catch (error) {
    next(error);
  }
}

export async function buildCategoryView(req, res, next) {
  try {
    const categoryId = req.params.categoryId;
    const selectedSort = getSelectedSort(req.query.sort);
    const selectedStatus = getSelectedStatus(req.query.status);
    const category = await inventoryModel.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).render('inventory/list', {
        title: 'Category Not Found',
        vehicles: [],
        categoryName: null,
        selectedSort,
        selectedStatus,
      });
    }

    const vehicles = await inventoryModel.getVehiclesByCategoryId(categoryId, selectedSort, selectedStatus);

    res.render('inventory/list', {
      title: category.category_name,
      vehicles,
      categoryName: category.category_name,
      selectedSort,
      selectedStatus,
    });
  } catch (error) {
    next(error);
  }
}