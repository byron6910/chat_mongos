const path =require('path');
const {randomNumber}=require('../helpers/libs');
const fs=require('fs-extra');
const {Image}=require('../models/index');

const ctrl={};

ctrl.index=(req,res)=>{

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
          //res.redirect('/images/:image_id');
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

ctrl.comment=(req,res)=>{

};

ctrl.remove=(req,res)=>{

};



module.exports=ctrl;
