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

  //fs.readFile('./stopwatch3.js', 'utf8', function(err, data) {
	//response.writeHead(200, {"Content-Type": "text/html"});

	//response.write(data);
     // });
      
//response.writeHead(200, {"Content-Type": "text/html"});
//response.end(data);
      
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
