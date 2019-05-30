const mongoose=require('mongoose');
const {database}=require('./keys.js') //{} destructurar js


mongoose.connect(database.URI,{
  useNewUrlParser:true
})
  .then(db=>console.log('DB es conectado'))
  .catch(err=>console.log(err));
