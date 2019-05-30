const path = require('path');
const exphbs = require('express-handlebars')
const morgan = require('morgan');
const multer = require('multer');
const express=require('express');
const errorHandler=require('errorhandler');

const routes=require('../routes')
module.exports=app=>{
  //settings
  app.set('port',3000 || process.env.PORT);
  app.set('views',path.join(__dirname,'../views'));
  app.engine('.hbs',exphbs({
    defaultLayout:'main.hbs',
    partialsDir:path.join(app.get('views'),'partials'),
    layoutsDir:path.join(app.get('views'),'layouts'),
    extname:'.hbs',
    helpers:require('./helpers')
  }));
  app.set('view engine','.hbs');
  //middlewares
  app.use(morgan('dev'));
  app.use(multer({
    dest:path.join(__dirname,'../public/upload/temp')}).single('image'));//enviar una vez la imagen
  app.use(express.urlencoded({extended:false}));//recibir datos desde formularios
  app.use(express.json());//entender objetos.
  //routes

  routes(app);

  //static files

  app.use('/public',express.static(path.join(__dirname,'../public')));


  //errorhandlers
  if('development'===app.get('env')){
    app.use(errorHandler);
  }


  return app;
};
