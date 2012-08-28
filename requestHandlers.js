var querystring = require("querystring");
var fs = require("fs");
var util = require('util');
var http = require('http');

function start(fullpath, response) {
  console.log("Request handler 'start' was called.");

	var data  = '';
	
  fs.readFile('./sortexample3.html', function(err, data) {
	//response.writeHead(200, {"Content-Type": "text/html"});
	//response.write(data);
	  response.end(data);
      });	
     
}

function buildswimmers(fullpath, response) {
  console.log("build the swimmer for this lane");

// query couch to get existing save swimmers (could be in groups e.g. lane swimmers)	
	
// query couch for list of swimmer, then make HTML
	var swimstarters = '<li class="ui-state-default"  id="500101">Swimmer 1 HR';
	swimstarters += '<input type="number" name="heartrate"  size="4" />SC<input type="number" name="strokecount"  size="4" />';
	swimstarters +=	'<ul id="controls">';
	swimstarters +=	'<li><a href="#" id="stop" name="500101" >Stop</a></li>';
	swimstarters +=	'<li><a href="#" id="split" name="500101" >Split</a></li>';
	swimstarters +=	'</ul>';
	swimstarters +=	'<ul id="splits500101">';
	swimstarters +=	'<li></li>';
	swimstarters +=	'</ul></li>';
swimstarters += '<li class="ui-state-default"  id="500102">Swimmer 2 HR<input type="number" name="heartrate"  size="4" />SC<input type="number" name="strokecount"  size="4" />';
	swimstarters +=	'<ul id="controls">';
	swimstarters +=	'<li><a href="#" id="stop" name="500102" >Stop</a></li>';
	swimstarters +=	'<li><a href="#" id="split" name="500102" >Split</a></li>';
	swimstarters +=	'</ul>';
	swimstarters +=	'<ul id="splits500102">';
	swimstarters +=	'<li></li>';
	swimstarters +=	'</ul></li>';	
	response.end(swimstarters);
      
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
	

  fs.readFile('.css/dragdrop3.css', function(err, data) {
		
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

function saveswimtimes(fullpath, response, request) {
  console.log("Request handler 'saveswimtimes' was called");
 if(request.method == 'POST'){
			 
		var datain = '';
		var cleandata = '';
		request.on('data', function(chunk) {
			datain += chunk;
			cleandata = querystring.parse(datain);
console.log('we have save next stage is to save to couch');
console.log(datain);
console.log(cleandata);		
			
// before saving need split into individaul swimmer data chunks and then save
//cleandata.forEach(function(swimsplitsdata){
//console.log('for each swimmer data');
//console.log(swimsplitsdata);	
//});			
					
// now pass on that data to couch via a PUT API call					
		var opts = {
    host: 'localhost',
    port: 5984,
    method: 'PUT',
    path: '/traintimer/cd69f4aa9ba14b39b96e2519787798yb',
    headers: {}
		};
	
	// JSON encoding
		opts.headers['Content-Type'] = 'application/json';
		data = JSON.stringify(cleandata);//JSON.stringify(req.data);
		opts.headers['Content-Length'] = data.length;
		rec_data = '';
	
				var reqc = http.request(opts, function(responsec) {
		
				responsec.on('data', function(chunk) {
				rec_data += chunk;
				});
					
				responsec.on('end', function() {
	console.log('any response data from couch??');	
	console.log(rec_data);
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

		response.end();					
					
		});
	}
      
}

exports.start = start;
exports.stopwatch3 = stopwatch3;
exports.dragdrop3 = dragdrop3;
exports.scrollmin = scrollmin;
exports.stopwatchcss = stopwatchcss;
exports.saveswimtimes = saveswimtimes;
exports.buildswimmers = buildswimmers;
