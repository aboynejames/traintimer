var querystring = require("querystring");
var fs = require("fs");
var util = require('util');

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

exports.start = start;
exports.stopwatch3 = stopwatch3;
exports.dragdrop3 = dragdrop3;
exports.scrollmin = scrollmin;
exports.stopwatchcss = stopwatchcss;
