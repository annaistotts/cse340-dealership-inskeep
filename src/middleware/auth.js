export function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  next();
}

function normalizeRole(role) {
  return String(role ?? '').trim().toLowerCase();
}

export function requireEmployee(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const role = normalizeRole(req.session.user.role);

  if (!['employee', 'owner', 'admin'].includes(role)) {
    return res.status(403).send('Access denied');
  }

  next();
}

export function requireOwner(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const role = normalizeRole(req.session.user.role);

  if (!['owner', 'admin'].includes(role)) {
    return res.status(403).send('Access denied');
  }

  next();
}