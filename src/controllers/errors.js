export function notFoundHandler(req, res) {
  res.status(404).render('pages/vehicle-detail', {
    title: 'Page Not Found',
    vehicle: null,
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).render('pages/vehicle-detail', {
    title: 'Server Error',
    vehicle: null,
  });
}