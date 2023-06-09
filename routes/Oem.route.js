const express = require("express")
const { OemModel } = require("../model/Oem.model")
const OemRouter = express.Router()

OemRouter.get("/", async (req, res) => {
  let { search } = req.query;

  try {
    const data = search ? await OemModel.find(
        { $text: { $search: search } },
        { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } })
        :
        await OemModel.find()

    res.send(data);
  } catch (err) {
    res.send(err.message);
    console.log('err:', err);
  }
});

OemRouter.get("/:id", async (req, res) => {
    const ID = req.params.id
    console.log('id:', ID)
  
    try {
      const data = await OemModel.find({_id:ID})
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });
  
module.exports={
    OemRouter
}