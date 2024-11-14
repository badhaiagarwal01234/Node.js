const mongoose = require('mongoose')

const sales = new mongoose.Schema({
   Name:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
   },
   password:{
    type:String,
    required:true,
   },
   dob:{
    type:date,
    required:true,
   }
})