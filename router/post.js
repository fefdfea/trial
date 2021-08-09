const router = require("express").Router();
const path = require('path');
const postSchema = require('./../config/schema/postSchema');
router.get('/:id',function(req,res){
  postSchema.findPostData( req.params.id ,function(err,result){
    if( err ) return err;
    if( result === false ){
      return res.status(400).json({ message: '정보 요청에 실패했습니다.' });
    }else{
      return res.render(path.join('./../views/post.ejs'),{ data: result });
    }
  })
});

module.exports = router;
