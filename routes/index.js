
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req, res){
    res.render('login', { title: 'Express' });
};

exports.signup = function(req, res){
    res.render('signup', { title: 'Express' });
};

exports.home = function(req, res){
    res.render('home', { title: 'Express' });
};