const router = require('express').Router();
const path = require('path');
const schema = require('../config/schema/userSchema.js');

router.get('/', function (req, res) {
  res.render(path.join('../views/sign_up.ejs'));
});

router.post('/signUp_info', function (req, res) {

  if (req.body) {
    schema.Sign_up(req.body,function(err,result){
       
      if( err ) return err;

      if( result === true ){
        console.log('성공');
        return res.status(200).json({ message: 'success' ,status : result});
      }else{
        console.log('실패');
        return res.status(400).json({ message: '이미 존재하는 아이디 입니다.' , status: result });
      } 
    });
  }
});

module.exports = router;