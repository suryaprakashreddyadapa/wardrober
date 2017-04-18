var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable');

var routes = require('./routes');
var users = require('./routes/users');
var authentication = require('./routes/authentication');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/home', routes.home);
app.post('/login', authentication.loginUser)
app.get('/signup', routes.signup);
app.post('/signup', authentication.signup);
app.post('/api/images', function(req, res) {
    // create an incoming form object
    var form = new formidable.IncomingForm();
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/public/images');
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });
    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });
    // parse the incoming request containing the form data
    form.parse(req);
});

app.get('/images', function (req, res) {
    const testFolder = './public/images';
    const fs = require('fs');
    fs.readdir(testFolder, function(err, files){
        var data = [];
        files.forEach(function(file){
            data.push(file);
            console.log(file);
        });
        send(data);
    });

    var send = function(data) {
      res.send({
          "images": data
      });
    };
    //res.sendfile(path.resolve('./uploads/image.png'));
});

app.get('/images/:imageid', function (req, res) {
    res.sendfile(path.resolve('./public/images/' + req.params.imageid));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
