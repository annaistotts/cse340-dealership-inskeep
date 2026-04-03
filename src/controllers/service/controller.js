import serviceModel from '../../models/service/model.js';

function toTitleCase(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function buildServiceForm(req, res) {
  res.render('service/form', {
    title: 'Request Service',
  });
}

export async function submitServiceRequest(req, res, next) {
  try {
    const {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      service_type,
      request_description,
    } = req.body;

    const normalizedMake = toTitleCase(vehicle_make);
    const normalizedModel = toTitleCase(vehicle_model);

    const user_id = req.session.user.user_id;

    await serviceModel.createServiceRequest({
      user_id,
      vehicle_year,
      vehicle_make: normalizedMake,
      vehicle_model: normalizedModel,
      service_type,
      request_description,
    });

    res.redirect('/service/history');
  } catch (error) {
    next(error);
  }
}

export async function viewServiceHistory(req, res, next) {
  try {
    const user_id = req.session.user.user_id;
    const requests = await serviceModel.getRequestsByUserId(user_id);

    res.render('service/history', {
      title: 'My Service Requests',
      requests,
    });
  } catch (error) {
    next(error);
  }
}