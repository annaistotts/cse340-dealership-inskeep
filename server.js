import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import pgSession from 'connect-pg-simple';

import db from './src/models/db.js';
import routes from './src/routes/index.js';
import { addLocalVariables } from './src/middleware/global.js';
import { errorHandler, notFoundHandler } from './src/controllers/errors.js';


/**
 * Server configuration
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

/**
 * Setup Express server
 */
const app = express();

/**
 * Configure Express
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Global middleware
 */
app.use(addLocalVariables);

/**
 * Session management
 */
const PgSession = pgSession(session);

app.use(
  session({
    store: new PgSession({
      pool: db,
      tableName: 'session',
    }),
    secret: 'supersecret', // later move to .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

/**
 * Routes
 */
app.use('/', routes);

/**
 * Error handling
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});