const router = require("express").Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(__dirname + "/../config/awsConfig.json");
require('dotenv').config();


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
    fileSize: 1024 * 1024 * 16
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
  res.status(200).send({ message: "success" });
})



module.exports = router;