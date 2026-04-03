function sanitizeText(value) {
	return String(value ?? '').trim();
}

function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sendValidationError(res, message) {
	return res.status(400).send(message);
}

export function validateRegister(req, res, next) {
	const first_name = sanitizeText(req.body.first_name);
	const last_name = sanitizeText(req.body.last_name);
	const email = sanitizeText(req.body.email).toLowerCase();
	const password = String(req.body.password ?? '');

	if (!first_name || first_name.length > 50) {
		return sendValidationError(res, 'Invalid first name.');
	}

	if (!last_name || last_name.length > 50) {
		return sendValidationError(res, 'Invalid last name.');
	}

	if (!isEmail(email) || email.length > 255) {
		return sendValidationError(res, 'Invalid email address.');
	}

	if (password.length < 8 || password.length > 72) {
		return sendValidationError(res, 'Password must be between 8 and 72 characters.');
	}

	req.body.first_name = first_name;
	req.body.last_name = last_name;
	req.body.email = email;
	req.body.password = password;
	return next();
}

export function validateLogin(req, res, next) {
	const email = sanitizeText(req.body.email).toLowerCase();
	const password = String(req.body.password ?? '');

	if (!isEmail(email) || !password) {
		return sendValidationError(res, 'Invalid login credentials.');
	}

	req.body.email = email;
	req.body.password = password;
	return next();
}

export function validateContact(req, res, next) {
	const name = sanitizeText(req.body.name);
	const email = sanitizeText(req.body.email).toLowerCase();
	const subject = sanitizeText(req.body.subject);
	const message = sanitizeText(req.body.message);

	if (!name || name.length > 100) {
		return sendValidationError(res, 'Invalid name.');
	}

	if (!isEmail(email) || email.length > 255) {
		return sendValidationError(res, 'Invalid email address.');
	}

	if (subject.length > 150) {
		return sendValidationError(res, 'Subject is too long.');
	}

	if (!message || message.length > 5000) {
		return sendValidationError(res, 'Invalid message.');
	}

	req.body.name = name;
	req.body.email = email;
	req.body.subject = subject;
	req.body.message = message;
	return next();
}

export function validateServiceRequest(req, res, next) {
	const vehicle_year = Number.parseInt(req.body.vehicle_year, 10);
	const vehicle_make = sanitizeText(req.body.vehicle_make);
	const vehicle_model = sanitizeText(req.body.vehicle_model);
	const service_type = sanitizeText(req.body.service_type);
	const request_description = sanitizeText(req.body.request_description);

	if (!Number.isInteger(vehicle_year) || vehicle_year < 1900 || vehicle_year > 2100) {
		return sendValidationError(res, 'Invalid vehicle year.');
	}

	if (!vehicle_make || vehicle_make.length > 60) {
		return sendValidationError(res, 'Invalid vehicle make.');
	}

	if (!vehicle_model || vehicle_model.length > 60) {
		return sendValidationError(res, 'Invalid vehicle model.');
	}

	if (!service_type || service_type.length > 60) {
		return sendValidationError(res, 'Invalid service type.');
	}

	if (request_description.length > 5000) {
		return sendValidationError(res, 'Service description is too long.');
	}

	req.body.vehicle_year = String(vehicle_year);
	req.body.vehicle_make = vehicle_make;
	req.body.vehicle_model = vehicle_model;
	req.body.service_type = service_type;
	req.body.request_description = request_description;
	return next();
}

export function validateReview(req, res, next) {
	const review_text = sanitizeText(req.body.review_text);
	const rating = Number.parseInt(req.body.rating, 10);

	if (!review_text || review_text.length > 3000) {
		return sendValidationError(res, 'Invalid review text.');
	}

	if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
		return sendValidationError(res, 'Rating must be between 1 and 5.');
	}

	req.body.review_text = review_text;
	req.body.rating = rating;
	return next();
}

export function validateCategory(req, res, next) {
	const category_name = sanitizeText(req.body.category_name);

	if (!category_name || category_name.length > 60) {
		return sendValidationError(res, 'Invalid category name.');
	}

	req.body.category_name = category_name;
	return next();
}

export function validateOwnerVehicle(req, res, next) {
	const category_id = Number.parseInt(req.body.category_id, 10);
	const year = Number.parseInt(req.body.year, 10);
	const make = sanitizeText(req.body.make);
	const model = sanitizeText(req.body.model);
	const price = Number(req.body.price);
	const mileageRaw = sanitizeText(req.body.mileage);
	const mileage = mileageRaw === '' ? 0 : Number.parseInt(mileageRaw, 10);
	const transmission = sanitizeText(req.body.transmission);
	const fuel_type = sanitizeText(req.body.fuel_type);
	const description = sanitizeText(req.body.description);
	const availability = sanitizeText(req.body.availability);
	const featured = sanitizeText(req.body.featured).toLowerCase();

	if (!Number.isInteger(category_id) || category_id <= 0) return sendValidationError(res, 'Invalid category.');
	if (!Number.isInteger(year) || year < 1900 || year > 2100) return sendValidationError(res, 'Invalid year.');
	if (!make || make.length > 60) return sendValidationError(res, 'Invalid make.');
	if (!model || model.length > 60) return sendValidationError(res, 'Invalid model.');
	if (!Number.isFinite(price) || price < 0) return sendValidationError(res, 'Invalid price.');
	if (!Number.isInteger(mileage) || mileage < 0) return sendValidationError(res, 'Invalid mileage.');
	if (transmission.length > 50) return sendValidationError(res, 'Invalid transmission.');
	if (fuel_type.length > 50) return sendValidationError(res, 'Invalid fuel type.');
	if (!description || description.length > 5000) return sendValidationError(res, 'Invalid description.');
	if (!availability || availability.length > 30) return sendValidationError(res, 'Invalid availability.');
	if (featured !== 'true' && featured !== 'false') return sendValidationError(res, 'Invalid featured value.');

	req.body.category_id = category_id;
	req.body.year = year;
	req.body.make = make;
	req.body.model = model;
	req.body.price = price;
	req.body.mileage = mileage;
	req.body.transmission = transmission;
	req.body.fuel_type = fuel_type;
	req.body.description = description;
	req.body.availability = availability;
	req.body.featured = featured;
	return next();
}

export function validateVehicleDetails(req, res, next) {
	const price = Number(req.body.price);
	const description = sanitizeText(req.body.description);
	const availability = sanitizeText(req.body.availability);

	if (!Number.isFinite(price) || price < 0) {
		return sendValidationError(res, 'Invalid price.');
	}

	if (!description || description.length > 5000) {
		return sendValidationError(res, 'Invalid description.');
	}

	if (!availability || availability.length > 30) {
		return sendValidationError(res, 'Invalid availability.');
	}

	req.body.price = price;
	req.body.description = description;
	req.body.availability = availability;
	return next();
}

export function validateServiceAdminUpdate(req, res, next) {
	const status = sanitizeText(req.body.status);
	const employee_notes = sanitizeText(req.body.employee_notes);

	if (!status || status.length > 40) {
		return sendValidationError(res, 'Invalid status.');
	}

	if (employee_notes.length > 5000) {
		return sendValidationError(res, 'Notes are too long.');
	}

	req.body.status = status;
	req.body.employee_notes = employee_notes;
	return next();
}

export function validateRoleUpdate(req, res, next) {
	const role = sanitizeText(req.body.role).toLowerCase();

	if (!['customer', 'employee'].includes(role)) {
		return sendValidationError(res, 'Invalid role.');
	}

	req.body.role = role;
	return next();
}
