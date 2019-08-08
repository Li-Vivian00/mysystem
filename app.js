var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// const bodyParser = require('body-parser') //post数据需要
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
var app = express();

var userLoginApi = require('./controllers/login/userLogin');
var adminLoginApi = require('./controllers/login/adminLogin');


const userManageApi = require('./controllers/admin/userManage/userManage')
const adminManageApi = require('./controllers/admin/userManage/adminManage')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/api/userLogin',userLoginApi)
app.use('/api/adminLogin',adminLoginApi)

app.use('/api/userManage',userManageApi)
app.use('/api/adminManage',adminManageApi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
