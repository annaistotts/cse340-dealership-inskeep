import inventoryModel from '../../models/inventory/model.js';
import reviewModel from '../../models/reviews/model.js';

const stats = [
  { value: '150+', label: 'Vehicles inspected and ready' },
  { value: '4.9/5', label: 'Average customer satisfaction' },
  { value: '48 hrs', label: 'Fast turnaround on approvals' },
];

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
    stats,
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
    const vehicles = await inventoryModel.getAllVehicles();
    res.render('inventory/list', {
      title: 'Inventory',
      vehicles,
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