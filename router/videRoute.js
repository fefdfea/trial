const router = require('express').Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(__dirname + "/../config/awsConfig.json");
const postSchema = require('../config/schema/postSchema');
const postobj = new postSchema();
const auth = require('./../config/middleware/auth.js');
require('dotenv').config();

router.use(auth);

let s3 = new AWS.S3();
//s3 업로드 라우터
let upload = multer({
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return callback(new Error('mp4확장자만 사용 가능합니다.'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024 * 50
  },
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUKKIT_NAME,
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, `video/${Date.now().toString()}_${extension}`)
    },
    acl: 'public-read',
  })
})

router.get('/',function(req,res){
  res.render(path.join('../views/upload.ejs'));
});


router.post('/upload',upload.single('video') ,function(req,res){
  try{
    //전송 정보에 비디오 location추가
    req.body.videoUrl = req.file.location;
    postobj.saveInfo(req.body,function( err,result ){
      if( err ) return err;
      if( result === true ){
        return res.redirect('/trial');
      }
      else{
        return res.status(400).json({ message: '요청실패', status: 400, });
      }
    });
  }
  catch ( err ){
    return res.status(400).json({ message: '전송실패' , status: 400 ,error: err })
  }
})

module.exports = router;