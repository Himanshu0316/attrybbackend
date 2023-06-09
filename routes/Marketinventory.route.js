const express = require("express")
const { MarketInventoryModel } = require("../model/Marketinventory.model")

const MarketInventoryRouter = express.Router()

MarketInventoryRouter.get("/", async (req, res) => {
  
    try {
      const data = await MarketInventoryModel.find().populate('oemSpecs')
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });
  MarketInventoryRouter.get("/get/:id", async (req, res) => {
    const ID = req.params.id
   
  
    try {
      const data = await MarketInventoryModel.find({_id:ID})
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });

MarketInventoryRouter.get("/dealer",async(req,res)=>{
    const ID = req.body.dealer
    try{
        console.log('ID:', ID)
        const notes = await MarketInventoryModel.find({ dealer: ID }).populate('dealer').populate('oemSpecs')
        res.send(notes)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

MarketInventoryRouter.post("/create", async(req,res)=>{
    const payload = req.body
    const newNote = new MarketInventoryModel(payload)
    await newNote.save()
    res.send(newNote)
})

MarketInventoryRouter.delete("/delete/:id",async(req,res)=>{
    const ID = req.params.id
    try{
        await MarketInventoryModel.findByIdAndDelete({_id:ID})
        res.send(`Note with ID ${ID} Deleted`)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

MarketInventoryRouter.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id
    try{
        let data = await MarketInventoryModel.findByIdAndUpdate({_id:ID},req.body)
        res.send(data)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})

module.exports={
    MarketInventoryRouter
}