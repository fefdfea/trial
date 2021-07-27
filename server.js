const express = require('express');
const app = express();
const mainRouter = require('./router/main');
const uploadRouter = require("./router/videRoute");



app.set("view engine","ejs");


app.use('/videoRoute',uploadRouter);

app.use('/',mainRouter)

app.listen(8080,function(){
  console.log('서버실행');
});