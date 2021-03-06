const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const index = require('./routes/index');
const article = require('./routes/admin/article/article');
const category = require('./routes/admin/category/category');
const articleApi=require('./routes/api/articlesApi')
const categoryApi=require('./routes/api/categoriesApi')
const usersApi=require('./routes/api/userApi')
const login =require('./routes/admin/authentication/login')
const logout =require('./routes/admin/authentication/logout')
const register =require('./routes/admin/authentication/register')
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());


// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/' ,index);
app.use('/admin/articles',ensureAuthenticated,article)
app.use('/admin/categories',ensureAuthenticated,category)
app.use('/api/articles', ensureAuthenticated,articleApi);
app.use('/api/categories',ensureAuthenticated, categoryApi);
 app.use('/api/users',ensureAuthenticated,usersApi)
app.use('/admin/login',login)
app.use('/admin/logout',logout)
app.use('/admin/register',register)
  

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;