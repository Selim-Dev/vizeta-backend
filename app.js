/* eslint-disable prettier/prettier */
const express = require('express');

const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// 1) Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use((req, res, next) => {
    req.requestTime = new Date().toDateString();
    // console.log(req.headers);
    next();
});

// 2) routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createNewTour);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 400)); // 400 bad requrest
});
app.use(globalErrorHandler);

module.exports = app;