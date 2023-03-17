const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router(); //create a new router and save it to a variable =>middlewware

// router.param('id', tourController.checkID);

//create checkBody middleware
//controller=>route handler functions

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);


router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post( tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
