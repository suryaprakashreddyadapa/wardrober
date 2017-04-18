/**
 * Created by Vaishnavi Reddy on 4/12/2017.
 */

/**
 *
 * https://jsfiddle.net/bba3jj4q/
 *
 **/

var dbHelper = require('./db-helper');
var mysql = require('./mysql');
var sqlQueryList = require('./sqlQueries');
var path = require('path'),
    fs = require('fs');

/**
 * authenticates a user and returns the response
 * @param request
 * @param response
 */
exports.loginUser = function(request, response) {
    // let us create a connection
    mysql.getConnection(function(connection) {

        // let us create a query to query the database server
        //var query = "select * from Users where email = '" + request.body.email + "'";
        var sqlQuery = sqlQueryList.getPasswordForEmailQuery(request.body.email);

        // try executing hte query
        dbHelper.executeQuery(connection,sqlQuery,function(userdata){
            //console.log(encryption.encrypt(userdata[0].password));
            if(JSON.stringify(userdata) === JSON.stringify([])) {
                console.log("empty response");
                dbHelper.closeConnection(connection);
                response.send({"status":401,"message":"login failure"});
            }
            else if(userdata[0].password === request.body.password) {
                /*request.session.profile = {};
                request.session.profile.puid = userdata[0].puid;
                request.session.profile.email = userdata[0].email;
                console.log("login is success");
                request.session.isLoggedIn = true;
                sqlQuery = sqlQueryList.getQueryForUserProfileByPuid(userdata[0].puid);
                dbHelper.executeQuery(connection,sqlQuery,function(profile){
                    if(profile[0]) {
                        console.log(profile[0]);
                        request.session.profile.handle = profile[0].handle;
                        request.session.profile.first_name = profile[0].first_name;
                        request.session.profile.last_name = profile[0].last_name;
                        request.session.profile.phone = profile[0].phone;
                        request.session.profile.city = profile[0].city;
                        request.session.profile.birthday = profile[0].birthday;
                        dbHelper.closeConnection(connection);
                        response.send({"status" : 200, "message" : "login success", "profile" : request.session.profile});
                    }
                    else {
                        response.send({"status": 401, "message" : "profile data not found"});
                    }
                });*/
                    response.send({"status" : 200, "message" : "login success"});
            }
            else {
                dbHelper.closeConnection(connection);
                console.log("Login is failure");
                response.send({"status":401, "message":"login failure"});
            }
        },function(error){
            dbHelper.closeConnection(connection);
            response.send(error);
        });
    }, function(error){
        response.send(error);
    });
};

//signup
exports.signup = function (request,response) {
    mysql.getConnection(function (connection) {

        var sqlquery = sqlQueryList.getQueryToCreateUser(request.body.email, request.body.password);

        var sqlquery1 = sqlQueryList.getQueryToCreateUserProfile(request.body.firstName, request.body.lastName, request.body.email, request.body.mobileNo);
        dbHelper.executeQuery(connection, sqlquery, function (userdata) {


            if (JSON.stringify(userdata) === JSON.stringify([])) {
                console.log("empty response");
                dbHelper.closeConnection(connection);
                response.send({"status": 401, "message": "login failure"});
            }
            else
            {
                dbHelper.executeQuery(connection, sqlquery1, function (userdata1) {

                    if (JSON.stringify(userdata1) === JSON.stringify([])) {
                        console.log("empty response");
                        dbHelper.closeConnection(connection);
                        response.send({"status": 401, "message": "login failure"});
                    }
                    else
                    {
                        response.send({"status": 200,"message":"signup successful"})
                    }
                }, function(error){
                    response.send(error);
                });
               // response.send({" status ": 200, "message" : "signup successful"})
            }

        }, function (error) {
            response.send(error);
        });
    });
};

exports.postImages = function(req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./public/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
};