const fs =require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndes: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

  //READ JSON FILE
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

  //IMPORT DATA INTO DATABASE
const ImportData = async()=>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    } catch(err){
        console.log(err);
    }
    process.exit();
}

//DELETE ALL DATA FROM DB
const deleteData = async() =>{
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    } catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    ImportData();
} else if(process.argv[2] === '--delete'){
deleteData();
}