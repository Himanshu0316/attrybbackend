const express = require("express")
require('dotenv').config()
const cors = require('cors')
const { connection } = require("./db")
const { MarketInventoryRouter } = require("./routes/Marketinventory.route")
const { dealerRouter } = require("./routes/Dealer.route")
const { OemRouter } = require("./routes/Oem.route")
const { auth } = require("./middleware/Auth.middleware")
const { MarketInventoryModel } = require("./model/Marketinventory.model")

const app=express()
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())

MarketInventoryRouter.get("/",async(req,res)=>{
    try{
        const oldCars = await MarketInventoryModel.find().populate('oemSpecs')
        res.send(oldCars)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
app.use("/dealer",dealerRouter)
  app.use(auth)
app.use("/OEM",OemRouter)
app.use("/Marketinventory",MarketInventoryRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log('err:', err)
    }
    console.log(`server running at PORT ${process.env.port}`)
})