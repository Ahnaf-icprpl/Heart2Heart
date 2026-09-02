/**
 * Heart2Heart - Express App Configuration
 */

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const morgan = require('morgan');

const currentUserMiddleware = require('./middleware/currentUser');
const errorHandler = require('./middleware/errorHandler');

const indexRouter = require('./routes/indexRouter');
const postRouter = require('./routes/postRouter');
const circleRouter = require('./routes/circleRouter');
const profileRouter = require('./routes/profileRouter');
const resourcesRouter = require('./routes/resourcesRouter');
const apiRouter = require('./routes/apiRouter');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Current User & Global Context Middleware
app.use(currentUserMiddleware);

// Routes
app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/circles', circleRouter);
app.use('/profile', profileRouter);
app.use('/resources', resourcesRouter);
app.use('/api', apiRouter);

// Error handling
app.use(errorHandler.notFound);
app.use(errorHandler.serverError);

module.exports = app;
