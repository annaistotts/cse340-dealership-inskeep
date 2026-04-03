import serviceModel from '../../models/service/model.js';
import inventoryModel from '../../models/inventory/model.js';
import reviewModel from '../../models/reviews/model.js';

export function buildAdminDashboard(req, res) {
  res.render('admin/dashboard', {
    title: 'Employee Dashboard',
  });
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