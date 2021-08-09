const router = require('express').Router();
const schema = require('../config/schema/userSchema.js');
const path = require('path');

router.get('/',function(req,res){
  res.render(path.join('../views/sign_in.ejs'));
});

router.post('/send_info',function(req,res){
  schema.Sign_in(req.body,function(err,result){
    if( err ) return err;
    if( result === false ){
      return res.status(400).json({ message: '로그인 실패', status : 400 })
    }
    else{ 
      res.cookie( 'key', result, {
        httpOnly:true,
      } );
      return res.status(200).json({ message: '로그인 성공', status : 200 });
     }
  })
});



module.exports = router;