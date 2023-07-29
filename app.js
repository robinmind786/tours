const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

/**
 * Routers
 */
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/**
 * MIDDLEWARES
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

/**
 * ROUTES
 */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
