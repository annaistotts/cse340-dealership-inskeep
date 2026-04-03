import serviceModel from '../../models/service/model.js';
import inventoryModel from '../../models/inventory/model.js';
import reviewModel from '../../models/reviews/model.js';
import contactModel from '../../models/contact/model.js';
import adminModel from '../../models/admin/model.js';

export function buildAdminDashboard(req, res) {
  const isOwner = req.session?.user?.role === 'owner';

  if (isOwner) {
    return res.redirect('/owner');
  }

  res.render('admin/dashboard', {
    title: 'Employee Dashboard',
    isOwner,
  });
}

export async function buildOwnerDashboard(req, res, next) {
  try {
    const counts = await adminModel.getDashboardCounts();
    const users = await adminModel.getAllUsers();

    res.render('admin/dashboard', {
      title: 'Owner Dashboard',
      counts,
      users,
      isOwner: req.session.user.role === 'owner',
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    const userId = Number.parseInt(req.params.userId, 10);

    if (!Number.isInteger(userId)) {
      return res.status(400).send('Invalid user id.');
    }

    if (!['customer', 'employee'].includes(role)) {
      return res.status(400).send('Invalid role.');
    }

    await adminModel.updateUserRole(userId, role);
    res.redirect('/owner');
  } catch (error) {
    next(error);
  }
}

function makeSlug(year, make, model) {
  return `${year}-${make}-${model}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export async function buildVehicleDashboard(req, res, next) {
  try {
    const vehicles = await inventoryModel.getAllVehicles();

    res.render('admin/vehicle-list', {
      title: 'Manage Vehicles',
      vehicles,
    });
  } catch (error) {
    next(error);
  }
}

export async function buildAddVehicle(req, res, next) {
  try {
    const categories = await inventoryModel.getAllCategories();

    res.render('admin/vehicle-form', {
      title: 'Add Vehicle',
      vehicle: null,
      categories,
    });
  } catch (error) {
    next(error);
  }
}

export async function addVehicle(req, res, next) {
  try {
    const {
      category_id,
      year,
      make,
      model,
      price,
      mileage,
      transmission,
      fuel_type,
      description,
      availability,
      featured,
    } = req.body;

    const slug = makeSlug(year, make, model);

    await inventoryModel.createVehicle({
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
      featured: featured === 'true',
    });

    res.redirect('/owner/vehicles');
  } catch (error) {
    next(error);
  }
}

export async function buildEditVehicle(req, res, next) {
  try {
    const vehicle = await inventoryModel.getVehicleById(req.params.vehicleId);
    const categories = await inventoryModel.getAllCategories();

    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }

    res.render('admin/vehicle-form', {
      title: 'Edit Vehicle',
      vehicle,
      categories,
    });
  } catch (error) {
    next(error);
  }
}

export async function editVehicle(req, res, next) {
  try {
    const {
      category_id,
      year,
      make,
      model,
      price,
      mileage,
      transmission,
      fuel_type,
      description,
      availability,
      featured,
    } = req.body;

    const slug = makeSlug(year, make, model);

    await inventoryModel.updateVehicle(req.params.vehicleId, {
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
      featured: featured === 'true',
    });

    res.redirect('/owner/vehicles');
  } catch (error) {
    next(error);
  }
}

export async function removeVehicle(req, res, next) {
  try {
    await inventoryModel.deleteVehicle(req.params.vehicleId);
    res.redirect('/owner/vehicles');
  } catch (error) {
    next(error);
  }
}

export async function buildVehicleManagement(req, res, next) {
  try {
    const vehicles = await inventoryModel.getAllVehicles();

    res.render('admin/vehicle-list', {
      title: 'Manage Vehicles',
      vehicles,
    });
  } catch (error) {
    next(error);
  }
}

export async function buildVehicleEdit(req, res, next) {
  try {
    const vehicle = await inventoryModel.getVehicleById(req.params.vehicleId);

    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }

    res.render('admin/vehicle-edit', {
      title: 'Edit Vehicle',
      vehicle,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateVehicleDetails(req, res, next) {
  try {
    const { price, description, availability } = req.body;

    await inventoryModel.updateVehicleDetails({
      vehicle_id: req.params.vehicleId,
      price,
      description,
      availability,
    });

    res.redirect('/admin/vehicles');
  } catch (error) {
    next(error);
  }
}

export async function buildReviewModeration(req, res, next) {
  try {
    const reviews = await reviewModel.getAllReviewsForModeration();

    res.render('admin/review-list', {
      title: 'Moderate Reviews',
      reviews,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteReviewModeration(req, res, next) {
  try {
    await reviewModel.deleteReview(req.params.reviewId);
    res.redirect('/admin/reviews');
  } catch (error) {
    next(error);
  }
}

export async function buildServiceDashboard(req, res, next) {
  try {
    const requests = await serviceModel.getAllServiceRequests();

    res.render('admin/service-list', {
      title: 'Manage Service Requests',
      requests,
    });
  } catch (error) {
    next(error);
  }
}

export async function buildServiceDetail(req, res, next) {
  try {
    const request = await serviceModel.getServiceRequestById(req.params.requestId);

    if (!request) {
      return res.status(404).send('Service request not found');
    }

    res.render('admin/service-detail', {
      title: 'Service Request Details',
      request,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateServiceRequest(req, res, next) {
  try {
    const { status, employee_notes } = req.body;

    await serviceModel.updateServiceRequest({
      request_id: req.params.requestId,
      status,
      employee_notes,
    });

    res.redirect(`/admin/service/${req.params.requestId}`);
  } catch (error) {
    next(error);
  }
}

export async function buildContactDashboard(req, res, next) {
  try {
    const messages = await contactModel.getAllContactMessages();

    res.render('admin/contact-list', {
      title: 'Contact Submissions',
      messages,
    });
  } catch (error) {
    next(error);
  }
}

export async function buildCategoryDashboard(req, res, next) {
  try {
    const categories = await inventoryModel.getAllCategories();

    res.render('admin/category-list', {
      title: 'Manage Categories',
      categories,
    });
  } catch (error) {
    next(error);
  }
}

export function buildAddCategory(req, res) {
  res.render('admin/category-form', {
    title: 'Add Category',
    category: null,
  });
}

export async function addCategory(req, res, next) {
  try {
    const { category_name } = req.body;

    await inventoryModel.createCategory(category_name);

    res.redirect('/owner/categories');
  } catch (error) {
    next(error);
  }
}

export async function buildEditCategory(req, res, next) {
  try {
    const category = await inventoryModel.getCategoryById(req.params.categoryId);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.render('admin/category-form', {
      title: 'Edit Category',
      category,
    });
  } catch (error) {
    next(error);
  }
}

export async function editCategory(req, res, next) {
  try {
    const { category_name } = req.body;

    await inventoryModel.updateCategory(req.params.categoryId, category_name);

    res.redirect('/owner/categories');
  } catch (error) {
    next(error);
  }
}

export async function removeCategory(req, res, next) {
  try {
    await inventoryModel.deleteCategory(req.params.categoryId);
    res.redirect('/owner/categories');
  } catch (error) {
    next(error);
  }
}