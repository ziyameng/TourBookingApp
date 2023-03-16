const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router(); //create a new router and save it to a variable =>middlewware

// router.param('id', tourController.checkID);

//create checkBody middleware
//controller=>route handler functions

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
