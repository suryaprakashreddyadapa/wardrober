/**
 *  Query for getting password for a given email
 */
exports.getPasswordForEmailQuery = function(email) {
	return "select * from Users where email = '" + email + "'";
};

/**
 *  Query for getting user profile for a given id
 */
exports.getQueryForUserProfileById = function(id) {
	return "select * from User_profiles where id = '" + id + "'";
};

/**
 *
 * @param email
 * @param password
 * @param firstname
 * @param lastname
 * @param mobile
 * @returns {string}
 */

exports.getQueryToCreateUser = function(email, password) {
    return " Insert into users(email,password) values('" + email + "','" + password + "')";
};

exports.getQueryToCreateUserProfile = function(firstName, lastName, email, mobile) {
	return " Insert into user_profiles ( id,firstname, lastname, email, mobile) values ( (select id from users where email='" + email + "'),'" + firstName  + "','" + lastName + "','" + email +"'," + mobile+")";
};


