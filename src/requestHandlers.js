/**
* Train TImer
*
* deals with site requests
* @class requestHandler
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/

var querystring = require("querystring");
var fs = require("fs");
var util = require('util');
var http = require('http');
var sio = require('socket.io');
//var Pouch = require('pouchdb');
var EventEmitter = require('events').EventEmitter;
var ttSettings = require("./ttSettings");
var nodemailer = require("nodemailer");

/**
* loads up home HTML page
* @method start
*
*/
function start(fullpath, response) {
  console.log("Request handler 'start' was called.");

	var data  = '';

  fs.readFile('./sortexample5.html', function(err, data) {
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		response.writeHead(200, {"Content-Type": "text/html"});

		response.end(data);
	});	
     
}

/**
* loads main Stopwatch JS class
* @method stopwatch3
*
*/
function stopwatch3(fullpath, response) {
  console.log("Request handler 'stopwatch js' was called.");
	var data  = '';
	
  fs.readFile('./stopwatch3.js', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(data);
	});
      
}

/**
* loads drag/drop css file
* @method dragdrop3
*
*/
function dragdrop3(fullpath, response) {
  console.log("Request handler 'dragdrop css' was called.");
	var data  = '';

  fs.readFile('./css/dragdrop3.css', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/css"});
		response.end(data);
	});
      
}

/**
* loads jQuery
* @method jquery172
*
*/
function jquery172(fullpath, response) {
  console.log("Request handler 'jquery' was called.");
	var data  = '';
	
  fs.readFile('./jquery-1.7.2.min.js', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(data);
	});
      
}

/**
* loads flotr2 chartJS
* @method flotr2chart
*
*/
function flotr2chart(fullpath, response) {
  console.log("Request handler 'chart' was called.");
	var data  = '';
	
  fs.readFile('./flotr2.min.js', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(data);
	});
      
}

/**
* loads appcache file
* @method localcache
*
*/
function localcache(fullpath, response) {
  console.log("Request handler 'appcache' was called.");	

  fs.readFile('./traintimer.appcache', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/cache-manifest"});
		response.end(data);
	});
      
}

/**
* loads pouchDB file
* @method pouchdb
*
*/
function pouchdb(fullpath, response) {
  console.log("Request handler 'pouchdb' was called.");	

  fs.readFile('./pouchdb.js', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(data);
	});
      
}

/**
* loads DBShim plug for alt local storage
* @method indexedDB
*
*/
function indexedDB(fullpath, response) {
  console.log("Request handler 'pouchdb' was called.");	

  fs.readFile('./IndexedDBShim.min.js', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(data);
	});
      
}

/**
* loads pouchDB class file
* @method pouchalpha
*
*/
function pouchalpha(fullpath, response) {
  console.log("Request handler 'pouchdb' was called.");	

  fs.readFile('./pouchdb.alpha.js', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(data);
	});
      
}

/**
* loads HTML view class
* @method ttHTML
*
*/
function ttHTML(fullpath, response) {
  console.log("Request handler 'pouchdb' was called.");	

  fs.readFile('./ttHTML.js', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(data);
	});
      
}

/**
* loads main CSS file
* @method stopwatchcss
*
*/
function stopwatchcss(fullpath, response) {
  console.log("Request handler 'start' was called.");

	var data  = '';
	

  fs.readFile('./stopwatch3.css', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/css"});
		response.end(data);
	});
      
}

/**
* loads images for the site
* @method imagesload
*
*/
function imagesload(fullpath, response) {
console.log("Request handler 'images load' was called.");	
//console.log(fullpath);
	
	if(fullpath[2] == 'red_asterisk.png')
	{
		fs.readFile('./css/images/red_asterisk.png', function(err, data) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.end(data);
		});
	}
	else if(fullpath[2] == 'invalid.png')
	{
		fs.readFile('./css/images/invalid.png', function(err, data) {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.end(data);
		});
	}
	else if(fullpath[2] == 'valid.png')
	{
		fs.readFile('./css/images/valid.png', function(err, data) {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.end(data);
		});
	}
}


/**
* process sign in requests
* @method signincheck
*
*/
function signincheck (fullpath, response, request, emitter, couchin, couchlive) {
	//set cookieid
	couchin.account['cookieset'] = fullpath[3];
	checkusercouch (response, fullpath); 

	function checkusercouch ( response, fullpath) {
//console.log('train details in from client ui');
//console.log(fullpath[4]);		
		checktpassdata = '';
		var  trainertocheck = '';
		
		var opts = {
		host: 'localhost',
		port: 5984,
		path: '/' + couchin.account['couchdbname'] + '/_design/trainers/_view/by_trainers?key="' + fullpath[2] + '"',
		auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd']
		};

		var requu = http.get(opts, function(checkinres) {
// console.log(res);
			checkinres.setEncoding('utf8');
			checkinres.on('data', function(signdata) {

				trainertocheck += signdata;	
	
			});

			checkinres.on('end', function() {
			
				jsontrainer =  JSON.parse(trainertocheck);
				jsontrainer["rows"].forEach(function(tpassdata){
		
					checktpassdata = tpassdata;	
			
				});	
//console.log('train user details');
//console.log(checktpassdata);
				
				// need to form back hash using salt and userdetails
									hashCode = function(str){
												var hash = 0;
												if (str.length === 0) return hash;
												for (i = 0; i < str.length; i++) {
														char = str.charCodeAt(i);
														hash = ((hash<<5)-hash)+char;
														hash = hash & hash; // Convert to 32bit integer
												}
												return hash;
										};
										runhashin = fullpath[4] + checktpassdata['id'];
//console.log(runhashin);										
						inbackuppassword = hashCode(runhashin);
//console.log('IN backup passowrd' + inbackuppassword);
				
				
		
			checkvalue =checktpassdata.hasOwnProperty("value");
//console.log('check value of true or false' + checktpassdata['value']);						
				if(checktpassdata['value'] == inbackuppassword) {
					//stringone = checktpassdata['value'].toString();
					//stringtwo = fullpath[4].toString();
					stringone = checktpassdata['value'];
					stringtwo = inbackuppassword;

					correctpwd = '';
						if(stringone === stringtwo) {
							correctpwd = {"signin":"passed"};
					// set the couchdb for this account
							couchlive.couchdbname = 'swimclub' + stringone;
//console.log(couchin.account['couchdbname']);					
						}
						else
						{
							correctpwd= {"signin":"wrong"};
					
						}
			

				checkjson = JSON.stringify(correctpwd);
				response.writeHead(200, {"Content-Type": "json"});
				response.end(checkjson);
				}
				else {
					correctpwd = {"signin":"wrong"};
					checkjson = JSON.stringify(correctpwd);
					response.writeHead(200, {"Content-Type": "json"});
					response.end(checkjson);
				
				}

			});

		});

	}  // sigincheck close

}  // closes sigincheck


/**
* routes signout requests
* @method signoutcheck
*
*/
function signoutcheck (fullpath, response, request, emitter, couchin, couchlive) {

	if((couchin.account['cookieset'] == fullpath[2]) && (fullpath[2] !== null)) {
		
		couchin.account['cookieset'] = '';
		couchlive.couchdbname = couchin.account['couchdbname'];
		response.end();
	}

} // closes signoutcheck
	
	
/**
* logic to produce list of swimmers
* @method buildswimmers
*
*/
function buildswimmers(firstpath, response, request, emitter, couchin) {
//console.log("build the swimmer for this lane");
//console.log('at hander filelllllllleelle' + util.inspect(couchin));
	// only allow lane load if signedin ie cookie set
	if((couchin.account['cookieset'] == firstpath[4]) && (firstpath[4] !== null))  {
// which lane, view, map for couchdb?
		laneforcouch = '';
		laneforcouch = firstpath[3]	;
		couchdesignview = '';
		couchdesignview = firstpath[2];
	
//console.log(laneforcouch, couchdesignview);	
	
// query couch to get existing save swimmers (could be in groups e.g. lane swimmers)	
		getSwimmerscouchdb (laneforcouch, couchdesignview);

	
		function getSwimmerscouchdb (laneforcouch, viewmapref) {
			
			formstartingswimmers = '';
			buildpathurl = '';
			
			// convert pathurl in couchdb path url string
			buildpathurl = '/' + couchin.account['couchdbname'] + '/_design/by' + viewmapref + '/_view/' + 'by_' + viewmapref + '?key="' + laneforcouch +'"';
			
			var opts = {
				host: 'localhost',
				port: 5984,
				path: buildpathurl,
				auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd']
			};

		var requu = http.get(opts, function(resw) {
		var swlivenew = '';
					//return testreturn;	
				resw.setEncoding('utf8');
				resw.on('data', function(data) {
					swlivenew += data;	
//console.log(swlivenew);								
				});
					resw.on('end', function() {
//console.log(' after end function what I am trying to return');			
//console.log(swlivenew);					
					resultjs = JSON.parse(swlivenew);
//console.log(resultjs["rows"]);
						
		
						resultjs["rows"].forEach(function(rowswimrs){
//console.log(rowswimrs['value']);	
						formstartingswimmers += formswimmers(rowswimrs['value'][1], rowswimrs['value'][0]);
//console.log(formstartingswimmers);							
							
						});
       		response.end(formstartingswimmers);
					});
				
	
			});
			
			}  // getSwimmer view from couchdb close
	 				
		function formswimmers(swname, swid) {
				
			var swimstarters = '<li class="ui-state-default"  id="' + swid + '">' + swname + ' HR';
			swimstarters += '<input type="number" name="heartrate"  size="4" />SC<input type="number" name="strokecount"  size="4" />';
			swimstarters +=	'<ul id="controls">';
			swimstarters +=	'<li><a href="#" id="stop" name="' + swid + '" >Stop</a></li>';
			swimstarters +=	'<li><a href="#" id="split" name="' + swid + '" >Split</a></li>';
			swimstarters +=	'</ul>';
			swimstarters +=	'<ul id="splits' + swid + '" class="splits" >';
			swimstarters +=	'<li></li>';
			swimstarters +=	'</ul></li>';
				
			return swimstarters;
		}
	} // closes if cookie set
	else
	{
		
			response.end('Please sign in.');
		
	}
}



/**
* loads broadcast file HTML
* @method viewswimtimes
*
*/
function viewswimtimes(fullpath, response) {
  console.log("view the splits on stop save in real time, eventually when ever a split or stop button is pressed");

		var timedata  = '';
	
  fs.readFile('./viewdata.html', function(err, timedata) {
		response.writeHead(200, {"Content-Type": "text/html"});
//response.write(data);
		response.end(timedata);
		});	

			
	}  //  viewswimtimes close

/**
* send request to node server to couchdb saving
* @method saveswimtimes
*
*/
function saveswimtimes(fullpath, response, request, emitter, couchin, couchlive) {
console.log("Request handler 'saveswimtimes' was called" );
//console.log(util.inspect(couchin));
//console.log(couchin.account['cookieset'] + 'fullpath' + fullpath[2]);
	// only allow lane load if signedin ie cookie set
	if((couchin.account['cookieset'] == fullpath[2]) && (fullpath[2] != null)) {
			
		 if(request.method == 'POST') {
					 
				var datain = '';
				var cleandata = '';
				request.on('data', function(chunk) {
					datain += chunk;
					
				});
				
				request.on('end', function() {
						cleandata =  JSON.parse(datain);
						if(cleandata['name'] ) {
							// new swimmer add
//console.log('this will be to save new master swimmer');				
							getUIDfromcouch (JSON.stringify(cleandata));
							response.end();	
							
						}
						else
						{
						// before saving need split into individaul swimmer data chunks and then save
						cleandatasw = cleandata;
						// we can now get this data out to display live splits/times anywhere on the web
						emitter.emit('splitscall', cleandatasw);	  	
//console.log('emitter has been called');							
/*
						var cleandatakey= Object.keys(cleandatasw);

						cleandatakey.forEach(function(swimsplitsdata){

			// need for reform JSON for couch and call on the PUT api call. (hive out to seperate function probably)
							// form data as string
							var sptoday = new Date();
						datesplitnumber = Date.parse(sptoday);//Date.parse(cleandata["swimstatus"]['swimdate']);
						newjsonswim = {};
						newjsonswim["swimmerid"] = '';
						newjsonswim["session"] = {};
						newjsonswim["swimmerid"] = 	swimsplitsdata;
						newjsonswim["session"][datesplitnumber] = cleandata["swimstatus"];	
						newjsonswim["session"][datesplitnumber]["splittimes"]	= cleandatasw[swimsplitsdata];
			console.log('new json swim');
			//console.log(newjsonswim);				
								stnewjsonswim = JSON.stringify(newjsonswim);
			// call save function/class eventually
							swimpath = '';
							swimpath = getUIDfromcouch (stnewjsonswim);
			//console.log('getUUIDDDD');
								
						});	// closes forEach to form data for couchdb
*/												
					response.end();
					
					}  // closes else	
										
				}); // initial requst of data from UI

			}  // opening if

					
					function getUIDfromcouch (newjsonswimin) {

						reudata = '';
							
						var opts = {
						host: 'localhost',
						port: 5984,
						path: '/_uuids',
						auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd'],
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
		//console.log(' after end function what I am trying to return');			
								saveswimcouch(newjsonswimin, reudata);			
							
							});
						
						});
					});
					
					}  // getuuid close
					
			// form function and call it internally for now
				function saveswimcouch(datatosaveswim, swimpathin) {
						
console.log('start of couch save');		
						// need to ask couchdb for unique doc id.
						swimpathlive = swimpathin;
	//console.log('what is return from UUDS');
	//console.log(swimpathlive );			
					// need to call the couchdb function / class  pass on data and PUT				
						var opts = {
						host: 'localhost',
						port: 5984,
						method: 'PUT',
						path: '/' + couchin.account['couchdbname'] + '/' + swimpathlive,
						auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd'],
						headers: {}
						};
			
			// JSON encoding
				opts.headers['Content-Type'] = 'application/json';
				data = datatosaveswim;//JSON.stringify(req.data);
		
				opts.headers['Content-Length'] = data.length;
				rec_data = '';
			
						var reqc = http.request(opts, function(responsec) {
				
							responsec.on('data', function(chunk) {
							rec_data += chunk;
							});
								
							responsec.on('end', function() {
//console.log('any response data from couch??');	
//console.log(rec_data);
							});
						
						});
					
						reqc.on('error', function(e) {
	//	console.log(e);
	console.log("Got error: " + e.message);
						});

						// write the data
						if (opts.method == 'PUT') {
//console.log('post has been sent');	
							reqc.write(data);
							
						}
						reqc.end();		
						
					}	
					
				} //closes if
				else
				{
					
					response.end('Please sign in to save');
					
				}
      
} // closes function


/**
* controls the syncing of data from local pouchdb to online couchdb
* @method pouchsync
*
*/
function pouchsync(fullpath, response, request, emitter, couchin, couchlive) {
console.log("pouchdb couchdb synup started");
	if(request.method == 'POST'){
					 
		var syncdatain = '';
		var cleandata = '';
		request.on('data', function(chunk) {
			syncdatain += chunk;
			
		});	
		
		request.on('end', function() {
		// make POST call to couchdb
//console.log('data sync received');
//console.log(syncdatain);
		cleandata =  JSON.parse(syncdatain);
		// next make a PUT call to couchdb API
		
			if(cleandata['name'] ) {
//console.log('this will be sync new master swimmer');		

				function syncUIDcall(callback) {  
					couchlive.getUIDfromcouch(callback);
					
				}  
			
			//syncUIDcall();
				syncUIDcall(function(responseuid) {  
//console.log('stared callback name');
//console.log(responseuid);
					//cleandata = {"name":"oner lane one"};
					couchlive.syncsave(cleandata, responseuid);
					response.end();
				});


			}
			else
			{
				function syncUIDcall(callback) {  
					couchlive.getUIDfromcouch(callback);
					
				}  
			
			//syncUIDcall();
				syncUIDcall(function(responseuid) {  
//console.log('stared callback splits');
//console.log(responseuid);
					//cleandata = {"split":"1334.34"};
					couchlive.syncsave(cleandata, responseuid);
					response.end();
				});
				
			}  // closes else	
		
	});
						
	}
		
	//Pouch.replicate('http://traintimer', 'http://localhost:5984/opentimer', function(err, changes) {
//console.log('replication complete');			
	//});
			
}  // closes pouchsync

/**
* controls sign up of backup service registration
* @method startbackup
*
*/
function startbackup(fullpath, response, request, emitter, couchin, couchlive) {
console.log("pouchdb couchdb synup started");
	if(request.method == 'POST'){
		
		var datain = '';
		var cleandata = '';
			request.on('data', function(chunk) {
			datain += chunk;
			
		});
		
		request.on('end', function() {

			
				cleanstartdata =  JSON.parse(datain);
//console.log(cleandata);					
//console.log('reply');									
			
				// get UUID for new save and perform save to couchdb
				function startUIDcall(callback) {  
					couchlive.getUIDfromcouch(callback);
					
				}  
			
			//syncUIDcall();
				startUIDcall(function(responseuid) {  
//console.log('stared callback splits');
//console.log(responseuid);
					//cleandata = {"split":"1334.34"};
					couchlive.syncsave(cleanstartdata, responseuid);
					startreply = {"startbackupreply":"An email will be sent to confirm the activation of the backup service along with a password within 24 hours. Thank you."};
					bakupstartjson = JSON.stringify(startreply);
					response.writeHead(200, {"Content-Type": "json"});
					response.end(bakupstartjson);
					

						// next step to save traintimer entry into couchdb
							// get UUID for new save and perform save to couchdb
				function trainerUIDcall(callback) {  
					couchlive.getUIDfromcouch(callback);
					
				}  
			
			//syncUIDcall();
				trainerUIDcall(function(responseuid) {  
				newcoachstart = {};

					
										// generate a password and hash it
					hashCode = function(str){
												var hash = 0;
												if (str.length == 0) return hash;
												for (i = 0; i < str.length; i++) {
														char = str.charCodeAt(i);
														hash = ((hash<<5)-hash)+char;
														hash = hash & hash; // Convert to 32bit integer
												}
												return hash;
										};
										sethaston = cleanstartdata['inpassword'] + responseuid;
							
						backuppassword = hashCode(sethaston);
//console.log('backup passowrd' + backuppassword);
			// save signup details to couchdb							
				newcoachstart['trainername'] = cleanstartdata['email'];
				newcoachstart['trainerpassword'] = backuppassword;
				newcoachtimerdata =  JSON.stringify(newcoachstart );
				couchlive.syncsave(newcoachstart, responseuid);
										
														// setup a new couchdb for this trainer
				couchlive.createnewcouchdb('swimclub' + backuppassword);
					
				});
				

				
				
				// next send an email message with password
console.log('what settings coming in' + couchin.account['smtpemail'] + couchin.account['smtppassword'] );
				var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: couchin.account['smtpemail'],
       pass: couchin.account['smtppassword'] 
   }
});

emailnewcoach = cleanstartdata['email'];
newcoachpassword = cleanstartdata['email'];
toaddress = 'New coach <' + emailnewcoach + '>';

backupthankyou = "Thank you for signing up to the mepath backup service for the swim train timer.  Your username is " + emailnewcoach + ' Password <private>';

smtpTransport.sendMail({
   from: "Swim Train Timer<swimtraintimer@mepath.co.uk>", // sender address
   to: toaddress, // comma separated list of receivers
   subject: "mepath backup service started", // Subject line
   text: backupthankyou // plaintext body
}, function(error, response){
   if(error)
	{
       console.log(error);
	}
	else
	{
console.log("Message sent: " + response.message);
	}
});
										
				});
			

//console.log('after reply');					
				});
		
	}

}		


exports.start = start;
exports.stopwatch3 = stopwatch3;
exports.pouchalpha = pouchalpha;		
exports.jquery172 = jquery172;
exports.flotr2chart = flotr2chart;
exports.indexedDB = indexedDB;
exports.pouchdb = pouchdb;		
exports.imagesload = imagesload;		
exports.dragdrop3 = dragdrop3;
exports.localcache = localcache;
exports.stopwatchcss = stopwatchcss;
exports.saveswimtimes = saveswimtimes;
exports.buildswimmers = buildswimmers;
exports.viewswimtimes =  viewswimtimes;
exports.signincheck =  signincheck;
exports.signoutcheck =  signoutcheck;
exports.ttHTML = ttHTML;
exports.pouchsync = pouchsync;	
exports.startbackup = startbackup;	