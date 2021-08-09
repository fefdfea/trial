const router = require('express').Router();
const path = require('path');
const auth = require('./../config/middleware/auth');

router.get('/',auth,function(req,res){
  res.render(path.join('../views/login.ejs'));
});


router.get('/logout',function(req,res){
  res.clearCookie('key');
  res.redirect('/');
});

module.exports = router;