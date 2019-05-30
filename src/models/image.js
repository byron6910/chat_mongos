const mongoose = require('mongoose');
const {Schema}=mongoose;
const path = require('path');

const ImageSchema=new Schema({
  title:{type:String},
  description:{type:String},
  filename:{type:String},
  views:{type:Number,default:0},
  comments:{type:Number,default:0},
  timestamp:{type:Date,default:Date.now}
});

ImageSchema.virtual('uniqueId')//variable virtual
.get(function(){//obtengo un solo valor
    return this.filename.replace(path.extname(this.filename),'')
});//obtener solo el nombre de archivo sin extension 
module.exports=mongoose.model('Image',ImageSchema);
