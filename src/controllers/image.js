const path =require('path');
const {randomNumber}=require('../helpers/libs');
const fs=require('fs-extra');
const {Image,Comment}=require('../models/index');
const md5=require('md5');

const ctrl={};

ctrl.index=async (req,res)=>{
  console.log(req.params.image_id);
  const image=await Image.findOne({filename:{$regex:req.params.image_id}});//busco uno solo con los parametros que coincidan
  //$regex validacion de expresion regular, que coincida con el otro parametro.

  console.log(image);
  res.render('image',{image});
};

ctrl.create= (req,res)=>{

  const saveImage=async ()=>{//funcion recursiva, se ejecuta a si misma
      const imgUrl=randomNumber();
      const images=await Image.find({filename:imgUrl})//buscar nombre de imagen caso se repita, por tanto consutla base de tdatos
      if(images.length>0){
        saveImage();//ejecuto para que no se repita el nombre de la imagen
      }else{
        console.log(imgUrl);
        console.log(req.file);//obtengo el objeto de imagen con multer
        const imageTempPath=req.file.path;
        const ext=path.extname(req.file.originalname).toLowerCase();//obtener extension de la imagen en minuscula
        const targetPath= path.resolve('public/upload/'+imgUrl+ext);

        if(ext==='.png'||ext==='.jpg'||ext==='.jpeg'||ext==='.gif'){
          await fs.rename(imageTempPath, targetPath);//mover carpeta
          const newImg=new Image({
            title:req.body.title,
            description:req.body.description,
            filename:imgUrl+ext
          });

          const imageSaved=await newImg.save();
          res.redirect('/images/'+imgUrl);
          res.send('works');
        }else{
          await fs.unlink(imageTempPath);//caso contrario borro la imagen temporal
          res.status(500).json({
            error:'Only img are allowed'
          });
        }

      }
    };
    saveImage();
  };



ctrl.like=(req,res)=>{

};

ctrl.comment=async(req,res)=>{
  const image=await Image.findOne({filename:{$regex:req.params.image_id}});//hago consulta a la bd de la imagen
  if (image) {
    const newComment=new Comment(req.body);
    newComment.gravatar=md5(newComment.email);
    newComment.image_id=image._id;
    console.log(newComment);
    await newComment.save();
    res.redirect('/images/'+image.uniqueId);
  }

  console.log(newComment);
};

ctrl.remove=(req,res)=>{

};



module.exports=ctrl;
