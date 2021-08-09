const router = require('express').Router();
const path = require('path');
const postSchema = require('./../config/schema/postSchema');
const auth = require('./../config/middleware/auth.js');


router.get('/',auth,function(req,res){
  postSchema.findData(function(err,result){
    if( err ) return err;
    if( result === false ) return res.status(400).json({ message: '정보 요청에 실패 했습니다.',status: 400 });
    else{
      return res.render(path.join('./../views/loginTrial.ejs'),{ data: result });
    }
  })
});


module.exports = router;