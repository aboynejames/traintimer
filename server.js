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
//var  io = require('socket.io');
var fs = require('fs');
//var SimpleEE = require("./SimpleEE");
var util = require('util');

function start(route, handle) {

  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname;
	  
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }


  
  var app = http.createServer(onRequest).listen(8822);

  }  


exports.start = start;