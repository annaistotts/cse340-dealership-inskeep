export function addLocalVariables(req, res, next) {
  res.locals.currentPath = req.path;
  res.locals.siteName = 'Driven Dealership';
  res.locals.currentYear = new Date().getFullYear();
  res.locals.currentUser = req.session.user || null;
  next();
}