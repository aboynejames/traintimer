var http = require('http');

/**
* Train TImer
*
* Train Timer couchdb operations
* @class couchdbSettings
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var coudchdbSettings = function(couchin) {
  this.account = {};
	this.couchdbname =  couchin.account['couchdbname'];
	this.couch =  couchin.account['couchuser'];
	this.couchpwd = couchin.account['couchpwd'];
	this.opts = {};

};

/**
* couch api options settings
* @method setoptions
*/
coudchdbSettings.prototype.setoptions = function() {

	this.opts = {
				host: 'localhost',
				port: 5984,
				path: '/' + this.couchdbname ,
				auth: this.couch + ':' + this.couchpwd,
	};

}

/**
* get a UUID from couchdb
* @method getUIDfromcouch
*/
coudchdbSettings.prototype.getUIDfromcouch = function(callbackin) {

	reudata = '';
		
	var opts = {
	host: 'localhost',
	port: 5984,
	path: '/_uuids',
	auth: this.couch + ':' + this.couchpwd,
	};

	var requu = http.get(opts, function(resuu) {
// console.log(res);
		//return testreturn;	
	resuu.setEncoding('utf8');
	resuu.on('data', function(data) {

		var  uuidnew = data;	
		jsonuud =  JSON.parse(uuidnew);

			jsonuud["uuids"].forEach(function(udata){
			
			reudata = udata;	
			});						

		resuu.on('end', function() {
console.log(' after end function what I am trying to return');			
console.log(reudata);
			
			callbackin(reudata);
		});
	
	});
});

}  // getuuid close


/**
* make post  ie save to couchdb
* @method syncsave
*/
coudchdbSettings.prototype.syncsave = function (datatosaveswim, swimpathin) {
	
console.log('start of couch save');		
	// need to ask couchdb for unique doc id.
console.log(swimpathin);
	swimpathlive = swimpathin;
	// need to call the couchdb function / class  pass on data and PUT				
					var opts = {
					host: 'localhost',
					port: 5984,
					method: 'PUT',
					path: '/' + this.couchdbname + '/' + swimpathlive,
					auth: this.couch + ':' + this.couchpwd,
					headers: {}
					};
	
		// JSON encoding
		opts.headers['Content-Type'] = 'application/json';
console.log('the data to sync');
console.log(datatosaveswim);
		data = JSON.stringify(datatosaveswim);
console.log(data);
		opts.headers['Content-Length'] = data.length;
		rec_data = '';
console.log(opts);			
		var reqc = http.request(opts, function(responsec) {
console.log('waiting for couch to responed . . . .');			
			responsec.on('data', function(chunk) {
				rec_data += chunk;
			});
							
			responsec.on('end', function() {
console.log('any response data from couch??');	
console.log(rec_data);

			});
		});
					
		reqc.on('error', function(e) {
//console.log("Got error: " + e.message);
		});

			// write the data
		if (opts.method == 'PUT') {
console.log('post has been sent');	
			reqc.write(data);
console.log('after put write');
		}
		reqc.end();		

}


/**
* create a new couchdb
* @method createnewcouchdb
*/
coudchdbSettings.prototype.createnewcouchdb = function (newnamecouch) {
	
console.log('start of create new couch');		

	var options = {
  hostname: 'localhost',
  port: 5984,
  path: '/' + newnamecouch,
  method: 'PUT',
	auth: this.couch + ':' + this.couchpwd,
};

var req = http.request(options, function(res) {
//console.log('STATUS: ' + res.statusCode);
//console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
console.log('BODY: ' + chunk);
  });
});

	req.on('error', function(e) {
//console.log('problem with request: ' + e.message);
	});

// write data to request body

	req.end();

}

module.exports = coudchdbSettings;