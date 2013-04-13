var _ = require("underscore");
var path = require("path");
var fs = require("fs");

var helper_utils = require("punch").Utils.Helper;
//var blog_content_handler = require("./../helpers/mocks-handler.js");

var homepage_posts = 10;
var teaser_length = 2;
var recent_posts = [];
var last_modified = null;


var tag_helpers = {

	recent_posts: function() {
    var output = [];
     var mocks = fs.readdirSync("templates/projects");
     mocks = _.reject(mocks, function(item){return item.charAt(0) == '.'})
    // console.log(mocks);
		return _.map(mocks, function(item){return {"item":item}});
	}

};

module.exports = {

	setup: function(config) {
		
	},

	directAccess: function(){
		return { "block_helpers": {}, "tag_helpers": {}, "options": {} };
	},

	get: function(basepath, file_extension, options, callback){
		var self = this;

		if (basepath !== "/index") {
			return callback(null, {}, {}, null);
		}

		return callback(null, { "tag": tag_helpers }, { }, last_modified);
	}

}