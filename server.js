const express = require('express');
const app = express();
const mainRouter = require('./router/main');
const videoRoute = require("./router/videRoute");
const trial = require('./router/trial');
const loginTrial = require('./router/loginTrial');
const sign_in = require('./router/sign_in');
const signUp = require('./router/sign_up');
const login = require('./router/login');
const post = require('./router/post');
const cookieParser = require('cookie-parser');


//뷰 엔진 셋팅, static파일 설정
app.set("view engine","ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));

//메인화면 라우터
app.use('/trial',trial);
app.use('/loginTrial',loginTrial);
app.use('/requestForTrial',videoRoute);
app.use('/sign_up',signUp);
app.use('/sign_in',sign_in);
app.use('/login',login);
app.use('/post',post);
app.use('/',mainRouter);

app.listen(8080,function(){
  console.log('서버실행');
});