////app.js all middlewares

const express = require('express');
const morgan = require('morgan');
//import the routers
const tourRouter = require('./routes/tourRoutes'); //file mame
const userRouter = require('./routes/userRoutes');

const app = express();

////1) MIDDLEWARE apply for all routes
//dirname is where the current script is located
//JSON.parse=>convert json file to javascript object
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
//middleware for post request: able to check req.body
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//build our own middleware
//this middleware apply to every single request because we didn't specify any route
app.use((req, res, next) => {
  console.log('hello from the middlewar👋');
  next(); //must have next, or the req-res cycle ctuck here, your res never send back to your client=>call next middleware funciton
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

////3) ROUTES=>mounting the routers: middleware apply for a certain route

//connect new router with our application
app.use('/api/v1/tours', tourRouter); // use middleware on this route=>small sub-app=>mounting a new router on a route

app.use('/api/v1/users', userRouter);

module.exports = app;
