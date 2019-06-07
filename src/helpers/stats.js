const {Comment,Image}=require('../models');

  async function imageCounter(){
    const images=await Image.countDocuments();//devuelve el total de las imagenes
    return images;
  }

  async function commentsCounter(){
    const comments= await Comment.countDocuments();//cuenta nuemor de objetos
    return comments;
  }

  async function imageTotalViewsCounter(){
    const result=await Image.aggregate([{$group:{
      _id:'1',
      viewsTotal:{$sum:'$views'}
    }}]);//aggregate toma objeto como parametro
    return result[0].viewsTotal;
  }

  async function likesTotalCounter(){
    const result=await Image.aggregate([{$group:{
        _id:'1',
        likesTotal:{$sum:'$likes'}
    }}]);
    return result[0].likesTotal;
  }
module.exports= async()=>{
//promisse ejecuta las consultas o funciones en paralelo, por eso le llamo

  const result=await Promise.all([
    imageCounter(),
    commentsCounter(),
    imageTotalViewsCounter(),
    likesTotalCounter()
  ])
  return {
    images:result[0],
    comments:result[1],
    views:result[2],
    likes:result[3]
  }
};
