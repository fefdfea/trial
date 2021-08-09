const router = require("express").Router();
const path = require('path');




router.get('/',function(req,res){
  res.render(path.join('../views/main.ejs'));
});

module.exports = router;