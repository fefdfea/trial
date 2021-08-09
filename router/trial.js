const router = require("express").Router();
const path = require('path');
const postSchema = require('./../config/schema/postSchema');



router.get('/',function(req,res){
  postSchema.findData(function(err,result){
    if( err ) return err;
    if( result === false ) return res.status(400).json({ message: '정보 요청에 실패 했습니다.',status: 400 });
    else{
      return res.render(path.join('./../views/trial.ejs'),{ data: result });
    }
  })
});

router.get('/post/:id',function(req,res){
  postSchema.findPostData( req.params.id ,function(err,result){
    if( err ) return err;
    if( result === false ){
      return res.status(400).json({ message: '정보 요청 실패',status: 400 });
    }
  });
});

module.exports = router;
