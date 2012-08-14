/**
* Train TImer
*
* Start node.js  Train Timer
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var util = require('util');

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;

handle["/css"] = requestHandlers.dragdrop3;
handle["/jquery.scrollTo-min.js"] = requestHandlers.scrollmin;
handle["/stopwatch3.css"] = requestHandlers.stopwatchcss;
handle["/stopwatch3.js"] = requestHandlers.stopwatch3;

//console.log(util.inspect(router));	

server.start(router.route, handle);