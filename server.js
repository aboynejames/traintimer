/**
* Train TImer
*
* Start node.js  Server
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var http = require("http");
var url = require("url");
var  sio = require('socket.io');
var fs = require('fs');
//var SimpleEE = require("./SimpleEE");
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var ttSettings = require("./ttSettings");
function start(route, handle) {

		var couchin = {};
		var	couchin = new ttSettings();
//console.log('setting prent on serversetup ' + couchin);	
	
    var app = http.createServer(onRequest).listen(8822);
			

	  
	function onRequest(request, response) {
	
    var pathname = url.parse(request.url).pathname;
  
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request, emitter, couchin);
  }
	
			// event listening
			splitsdata = '';
      var emitter = new EventEmitter;

			emitter.on('splitscall', function(splitsdata){
console.log('save data from splits emitter has been evented ');
console.log(splitsdata);
console.log('end of save apit data');
					
					io.sockets.on('connection', function (socketdata) {
						
		      socketdata.on('splitsdatalive', function (splitsdata) {
						// need to route to logic and present html code via the socket
console.log('from within message on socket listener');
console.log(splitsdata);
						socketdata.broadcast.emit('splitsdatalive', splitsdata);
							//socketdata.broadcast.emit('splitsdatalive', splitsdata);
						});
						
					socketdata.send("hell new client from james and co.");
					});
			});
	
			// data for live two way socket data flow for real time display everywhere
	 eventdataswim = {};
	 eventdataswim = { hello: 'world of train timer' };
		var io = sio.listen(app);


} // closes start function 


exports.start = start;
