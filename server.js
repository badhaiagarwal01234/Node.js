const express = require("express")
const mongoose = require("mongoose")

const app = express();
const PORT = 8080;

const MONGODBURL = 'mongodb://localhost:27017/batch';


mongoose.connect(MONGODBURL)
.then(()=>{
    console.log("Connected to MongoDB", MONGODBURL)
}).catch((error)=>{
    console.log("Error connecting to MongoDB", error)
})

const sales = new mongoose.Schema({

})

const salesData = mongoose.model('sales', sales)

app.get('/findAll',  async(req,res)=>{
    
    const mySalesData = await salesData.find();
    res.status(200).json(mySalesData);
  })

app.get('/getOne/:id',  async(req,res)=>{
  console.log(`>>>>>>>req.params>>>>>>>`,req.params);
  const {id} = req.params;
  
  const mySalesData = await salesData.findById(id);
  console.log(`>>>>>mysalesData>>>>>>>>`, mySalesData)
  
  if(!mySalesData){
    return res.status(404).json({error:'record not found'});
  }
  else{
    res.status(200).json(mySalesData);
  }

})


app.get('/deleteOne/:id',  async(req,res)=>{
    console.log(`>>>>>>>req.params`,req.params);
    const {id} = req.params 
    const deleteData = await salesData.findByIdAndDelete(id);
    if(!deleteData){
      return res.status(404).json({error:'record not found'});
    }
    res.status(200).json(deleteData);
  })


  app.get('/findByProduct/:pName', async(req,res)=>{
    const {pName} = req.params;
    const getByProduct = await salesData.findOne({product:pName});
    res.status(200).json(getByProduct);
  })


  // app.get('/getRecord/:rate', async(req,res)=>{
  //   const {rate} = req.params;
  //   const getByAmount = await salesData.findOne({amount:parseInt(rate)});
  //   res.status(200).json(getByAmount);
  // })

app.get('/getRecord/:amount', async(req,res)=>{
    const amount = Number(req.params.amount);
    const getByAmount = await salesData.findOne({amount});     //2nd method
    res.status(200).json(getByAmount);
  })

app.listen(PORT ,()=>{
  console.log(`server start to port ${PORT}`)
})


