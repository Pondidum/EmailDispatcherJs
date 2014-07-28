var Datastore = require("nedb");
var db = new Datastore({ filename: "app_data/stats.db", autoload: true });


var logEmail = function() {

};

exports.log = logEmail
