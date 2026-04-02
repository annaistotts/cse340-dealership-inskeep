export function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  next();
}

export function requireEmployee(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.role !== 'employee' && req.session.user.role !== 'owner') {
    return res.status(403).send('Access denied');
  }

  next();
}

export function requireOwner(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.role !== 'owner') {
    return res.status(403).send('Access denied');
  }

  next();
}