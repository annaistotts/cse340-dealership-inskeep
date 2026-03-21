import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import expressLayouts from 'express-ejs-layouts';

import siteRoutes from './src/routes/siteRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    res.locals.siteName = 'Driven Dealership';
    res.locals.currentYear = new Date().getFullYear();
    next();
});

app.use('/', siteRoutes);

app.use((req, res) => {
    res.status(404).render('pages/vehicle-detail', {
        title: 'Page Not Found',
        vehicle: null,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});