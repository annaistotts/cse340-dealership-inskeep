/**
 * Error handling controllers
 */

export const notFoundHandler = (req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent || res.finished) {
    return next(err);
  }

  const status = err.status || 500;
  const template = status === 404 ? '404' : '500';
  const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

  const context = {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    error: NODE_ENV === 'production' ? 'An error occurred' : err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
    NODE_ENV,
  };

  try {
    return res.status(status).render(`errors/${template}`, context);
  } catch (renderErr) {
    if (!res.headersSent) {
      return res.status(status).send(`<h1>Error ${status}</h1><p>An error occurred.</p>`);
    }
  }

  return next(err);
};