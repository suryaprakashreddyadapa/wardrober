/**
 * @author: Vaishampayan Reddy
 */
var mysql = require('mysql');

/* exports.getConnection = function(success,failure) {
	var connection = mysql.createConnection({
		host     : 'localhost',
	    user     : 'twitteradmin',
	    password : 'marias@1234',
	    database : 'twitterdb'
	});
	 connection.connect(function(err){
		 if(!err) {
		     success(connection);
		 } else {
		     failure("Error connecting database ... \n\n");  
		 }
		 });
}; */


var pool      =    mysql.createPool({
    connectionLimit : 600,
    host     : 'localhost',
    user     : 'wardrober',
    password : 'ward@1234',
    database : 'wardrober'
});

exports.getConnection = function(success, failure) {
	pool.getConnection(function(err, connection) {
		if (!err) {
			console.log("Database is connected");
			success(connection);
		} else {
			connection.release();
			console.log("Error connecting database");
			failure("Error connecting database");
		}
    });
};
