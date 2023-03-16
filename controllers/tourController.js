const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );



//take out the call back function(route handler)
exports.getAllTours = async (req, res) => {
  //query all the documents from the Tour colleciton  Tour.find()=>return a promise
  try{
    //BUILD THE QUERY
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el=>delete queryObj[el]);

    console.log(req.query, queryObj);
    const query= Tour.find(queryObj);
    //EXECUTE QUERY
    const tours = await query;

    //SEND RESPONSE
 res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours, //the second tours is corresponding to the const tours
      },
    });
  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    })
  }
};

exports.getTour = async (req, res) => {
try{
const tour = await Tour.findById(req.params.id);
//same : Tour.findOne({_id:req.params.id})
res.status(200).json({
  status: 'success',
  data: {
    tour,
  },
});
}catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  })
}


};

exports.createTour = async (req, res) => {

try{
  //method 1) create new document then save
  // const newTours = new Tour({});
  // Tour.create({});
  //method 2) create from the model
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
} catch(err){
  res.status(400).json({
    status:"fail",
    message: err
  })
}
};

exports.updateTour = async (req, res) => {
  try{
const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators:true
})

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });

  }catch(err){
    res.status(404).json({
      status:"fail",
      message: err
    })
  }
};

exports.deleteTour = async(req, res) => {
  try{
await Tour.findByIdAndDelete(req.params.id)


 res.status(204).json({
  status: 'success',
  data: null,
});

  } catch(err){
    res.status(404).json({
      status:"fail",
      message: err
    })
  }
 
};
