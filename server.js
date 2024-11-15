const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();
const Port = process.env.Port || 6080

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const userRouter = require('./Route/UserRoute')
app.use('/abc', userRouter)

mongoose.connect(process.env.MONGODBURL)
.then(()=>{
    console.log("Connected to MongoDB", process.env.MONGODBURL)
}).catch((error)=>{
    console.log("Error connecting to MongoDB", error)
})



app.get('/findAll', async(req,res)=>{
    
    const mySalesData = await salesData.find();
    res.status(200).json(mySalesData);
  })

app.get('/getOne/:id', async(req,res)=>{
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

app.listen(Port ,()=>{
  console.log(`server start to port ${Port}`)
})


