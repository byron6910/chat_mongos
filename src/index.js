const express=require('express');

const config=require('./server/config.js');

const database = require('./database.js');

const app=config(express());


app.listen(app.get('port'),(req,res)=>{
  console.log('server on port',app.get('port'));
});
