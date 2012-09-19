var querystring = require("querystring");
var fs = require("fs");
var util = require('util');
var http = require('http');
var sio = require('socket.io');
var EventEmitter = require('events').EventEmitter;
var ttSettings = require("./ttSettings");

couchin = {};

	
function start(fullpath, response) {
  console.log("Request handler 'start' was called.");

	var data  = '';

  fs.readFile('./sortexample5.html', function(err, data) {
	//response.writeHead(200, {"Content-Type": "text/html"});
	//response.write(data);
	  response.end(data);
      });	
     
}

/**
* check signin details
*
*/
function signincheck (fullpath, response) {
  
	couchin = new ttSettings();
//console.log(util.inspect(couchin));
//console.log(util.inspect(couchin.account));
	
				checkusercouch ( response, fullpath) 

				function checkusercouch ( response, fullpath) {
console.log('train details in from client ui');
console.log(fullpath);
				//parsecheckuser = JSON.parse(checkuser);
				checktpassdata = '';
				var  trainertocheck = '';
					
				var opts = {
				host: 'localhost',
				port: 5984,
				path: '/traintimer/_design/trainers/_view/by_trainers?key="' + fullpath[2] + '"',
				auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd'],
			};

   		var requu = http.get(opts, function(checkinres) {
 // console.log(res);
				checkinres.setEncoding('utf8');
				checkinres.on('data', function(signdata) {
	
					trainertocheck += signdata;	
				
				});

	
					checkinres.on('end', function() {
console.log('what is couch returning?? trainers');
console.log(trainertocheck);		 
						jsontrainer =  JSON.parse(trainertocheck);
console.log(jsontrainer);						
						jsontrainer["rows"].forEach(function(tpassdata){
						
						checktpassdata = tpassdata;	
							
						});	
console.log('train user details');
console.log(checktpassdata);
						checkjson = JSON.stringify(checktpassdata);
						response.writeHead(200, {"Content-Type": "json"});
						response.end(checkjson);

       		
					});

			});
			
			}  // sigincheck close

					
}  // closes sigincheck
				

/**
* get call on a couchdb view for list of swimmids and keys (make this function part of couchdb class with refactoring)
*
*/
function buildswimmers(fullpath, response) {
  console.log("build the swimmer for this lane");

// which lane, view, map for couchdb?
	laneforcouch = '';
	laneforcouch = fullpath[3]	;
	couchdesignview = '';
	couchdesignview = fullpath[2];
	
console.log(laneforcouch, couchdesignview);	
	
// query couch to get existing save swimmers (could be in groups e.g. lane swimmers)	
	getSwimmerscouchdb (laneforcouch, couchdesignview);

	
		function getSwimmerscouchdb (laneforcouch, viewmapref) {
			
				formstartingswimmers = '';
				buildpathurl = '';
			
			// convert pathurl in couchdb path url string
			  buildpathurl = '/traintimer/_design/by' + viewmapref + '/_view/' + 'by_' + viewmapref + '?key="' + laneforcouch +'"';
			
  			var opts = {
				host: 'localhost',
				port: 5984,
				path: buildpathurl,
				auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd'],
			};

   		var requu = http.get(opts, function(resw) {
				var swlivenew = '';
					//return testreturn;	
				resw.setEncoding('utf8');
				resw.on('data', function(data) {
	        //var swlivenew = {};
					swlivenew += data;	
//console.log(swlivenew);								
				});
					resw.on('end', function() {
console.log(' after end function what I am trying to return');			
console.log(swlivenew);					
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
			
}


function stopwatch3(fullpath, response) {
  console.log("Request handler 'stopwatch js' was called.");

	var data  = '';
	

  fs.readFile('./stopwatch3.js', function(err, data) {
		
	  	  response.end(data);
	  });
      
}


function dragdrop3(fullpath, response) {
  console.log("Request handler 'dragdrop css' was called.");

	var data  = '';
	

  fs.readFile('./css/dragdrop3.css', function(err, data) {
		
	  	  response.end(data);
	  });
		
		
      
}

function scrollmin(fullpath, response) {
  console.log("Request handler 'start' was called.");

	var data  = '';
	

  fs.readFile('./jquery.scrollTo-min.js', function(err, data) {
		
	  	  response.end(data);
	  });
      
}

function stopwatchcss(fullpath, response) {
  console.log("Request handler 'start' was called.");

	var data  = '';
	

  fs.readFile('./stopwatch3.css', function(err, data) {
		
	  	  response.end(data);
	  });
      
}

function saveswimtimes(fullpath, response, request, emitter) {
  console.log("Request handler 'saveswimtimes' was called");
	
 if(request.method == 'POST'){
			 
		var datain = '';
		var cleandata = '';
		request.on('data', function(chunk) {
			datain += chunk;
			cleandata =  JSON.parse(datain);
console.log('we have save next stage is to save to couch');
//console.log(datain);
//console.log(cleandata);		
// what sort of save, setup of new swimmer or saving of times data?			
				if(cleandata['name'] ) {
					// new swimmer add
//console.log('this will be to save new master swimmer');				
					getUIDfromcouch (JSON.stringify(cleandata));
					response.end();	
					
				}
				else
				{
				
	// before saving need split into individaul swimmer data chunks and then save
				cleandatasw = cleandata["splitdata"];
					
				// we can now get this data out to display live splits/times anywhere on the web
					//var emitter = new EventEmitter;
				emitter.emit('splitscall', cleandatasw);	  						
					
	//console.log('clean data splits');
	//console.log(cleandatasw);			
				var cleandatakey= Object.keys(cleandatasw);

				cleandatakey.forEach(function(swimsplitsdata){
				
	// identify the swimmer  get their doc id and then update their data				
					//swimsplitsdata

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
					jsonuud =  JSON.parse(uuidnew)

						jsonuud["uuids"].forEach(function(udata){
						
						reudata = udata;	
						});						
	
					resuu.on('end', function() {
//console.log(' after end function what I am trying to return');			
//console.log(reudata);
						saveswimcouch(newjsonswimin, reudata)					
       		
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
			path: '/traintimer/' + swimpathlive,
			auth: couchin.account['couchuser'] + ':' + couchin.account['couchpwd'],
			headers: {}
			};
	
	// JSON encoding
		opts.headers['Content-Type'] = 'application/json';
		data = datatosaveswim;//JSON.stringify(req.data);
//console.log('json object after stringify');
//console.log(data);			
		opts.headers['Content-Length'] = data.length;
		rec_data = '';
	
				var reqc = http.request(opts, function(responsec) {
		
					responsec.on('data', function(chunk) {
					rec_data += chunk;
					});
						
					responsec.on('end', function() {
console.log('any response data from couch??');	
//console.log(rec_data);
					});
				
				});
			
				reqc.on('error', function(e) {
console.log(e);
console.log("Got error: " + e.message);
				});

				// write the data
				if (opts.method == 'PUT') {
console.log('post has been sent');	
					reqc.write(data);
				}
				reqc.end();		
				
			}	
			

      
} // closes function

/**
* view the data capture in real time
*
*/
function viewswimtimes(fullpath, response, io) {
  console.log("view the splits on stop save in real time, eventually when ever a split or stop button is pressed");

		var timedata  = '';
	
  fs.readFile('./viewdata.html', function(err, timedata) {
	//response.writeHead(200, {"Content-Type": "text/html"});
	//response.write(data);
	  response.end(timedata);
      });	

			
			}  //  viewswimtimes close
	 	

exports.start = start;
exports.stopwatch3 = stopwatch3;
exports.dragdrop3 = dragdrop3;
exports.scrollmin = scrollmin;
exports.stopwatchcss = stopwatchcss;
exports.saveswimtimes = saveswimtimes;
exports.buildswimmers = buildswimmers;
exports.viewswimtimes =  viewswimtimes;
exports.signincheck =  signincheck;