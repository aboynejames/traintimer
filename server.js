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
var ttCouchDB = require("./ttCouchDB");
var serialport = require("serialport");	// include the serialport library
var SerialPort = serialport.SerialPort;	// make a local instance of serial

function start(route, handle) {

	var couchin = {};
	var couchlive = {};
	var	couchin = new ttSettings();
	var couchlive = new ttCouchDB(couchin);
	
	var app = http.createServer(onRequest).listen(8822);
	  
	function onRequest(request, response) {
	
    var pathname = url.parse(request.url).pathname;
  
console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request, emitter, couchin, couchlive);
  }
	
		// event listening
		splitsdata = '';
		var emitter = new EventEmitter;

		emitter.on('splitscall', function(splitsdata){
console.log('save data from splits emitter has been evented ');
console.log(splitsdata);
console.log('end of save split data');
//console.log(io);					
					io.sockets.on('connection', function (socket) {
console.log('connect socketstart');						
//		      socketdata.on('splitsdatalive', function (splitsdata) {
						// need to route to logic and present html code via the socket
console.log('from within message on socket listener');
console.log(splitsdata);
						stringswimdatalive = JSON.stringify(splitsdata);
						socket.emit('splitsdatalive', stringswimdatalive);
					  socket.emit('newswim', {hello: 'worldofswimmin'});
						//socket.broadcast.emit('splitsdatalive', splitsdata);
						});

				
/*
						io.sockets.on(
						'connection',
						function (socket) {
								socket.emit('newswim', {hello: 'worldofswimmin'});
							}
						);
*/					
			});	
				
			// data for live two way socket data flow for real time display everywhere
		var io = sio.listen(app);

		// serial port listener for touchpad mode  (will be WIFI)
		// open the serial port. Change the name to the name of your port, just like in Processing and Arduino:
	/*	var serialData = {};	// object to hold what goes out to the client
		var myPort = new SerialPort("/dev/ttyACM0", {
			// look for return and newline at the end of each data packet:
			parser: serialport.parsers.readline("\r\n")
		});*/
				
			
		io.sockets.on('connection', function (socket) {
        socket.emit('news', {hello: 'world'});

		/*	myPort.on('data', function (data) {
				// set the value property of scores to the serial string:
				serialData.value = data;
				// for debugging, you should see this in Terminal:
console.log(data);
				// send a serial event to the web client with the data:
				socket.emit('serialEvent', serialData);
			});  */
		
    });

  

} // closes start function 


exports.start = start;
