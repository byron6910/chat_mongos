const ctrl={};
const {Image}=require('../models/index');
ctrl.index=async (req,res)=>{
  const images=await Image.find().sort({timestamp:-1})//consulta base de datos de mongos con find y descendente
  res.render('index',{images:images});
};
module.exports=ctrl;
