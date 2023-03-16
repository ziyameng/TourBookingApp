//mongoose: tour schema
const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], //validator
    unique: true,
    trim: true
  },
  duration:{
type:Number,
required: [true, 'A tour must have a duration']
  },
  maxGroupSize:{
type:Number,
required:[true, 'A tour must have a group size']
  },
  difficulty:{
type:String,
required:[true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity:{
type:Number,
default:0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary:{
    type: String,
    trim: true, //working on string type. remove black space at the deginning and end
    required:[true, 'A tour must have a  summary']
  },
  description:{
    type: String,
    trim: true
  },
  imageCover:{
    type:String,
    required:[true, 'A tour must have a cover image']
  },
  images:[String],
  createAt: {
    type: Date,
    default: Date.now()
  },
  startDates:[Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;