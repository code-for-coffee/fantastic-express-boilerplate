
/**
 * @constant express
 */
const express = require('express'),
  /**
   * @constant path
   */
  path = require('path'),
  /**
   * @constant favicon
   */
  favicon = require('serve-favicon'),
  /**
   * @constant logger
   */
  logger = require('morgan'),
  /**
   * @constant cookieParser
   */
  cookieParser = require('cookie-parser'),
  /**
   * @constant bodyParser
   */
  bodyParser = require('body-parser');

/**
 * @class RoutesController
 * @returns {@link RoutesController}
 */
let routesCtrl = require('./app_server/controllers/index');
/**
 * @class RolesRouter
 * @returns {@link RolesRouter}
 */
let rolesCtrl = require('./app_server/routes/roles');
/**
 * @class UsersController
 * @returns {@link UsersController}
 */
let usersCtrl = require('./app_server/controllers/users');

/**
 * @class ExpressApp
 * @returns {@link express}
 */
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routesCtrl);
app.use('/users', usersCtrl);
app.use('/roles', rolesCtrl);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
