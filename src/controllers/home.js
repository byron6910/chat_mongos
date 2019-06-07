const ctrl={};

const {Image}=require('../models/index');
const sidebar=require('../helpers/sidebar');

ctrl.index=async (req,res)=>{
  const images=await Image.find().sort({timestamp:-1})//consulta base de datos de mongos con find y descendente
  let viewModel={images:[]};
  viewModel.images=images;
  viewModel=await sidebar(viewModel);   
  console.log(viewModel);
  
  res.render('index',viewModel); 
};
module.exports=ctrl;
