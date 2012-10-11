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
handle["/signin"] = requestHandlers.signincheck;
handle["/signout"] = requestHandlers.signoutcheck;

handle["/css"] = requestHandlers.dragdrop3;
handle["/jquery.scrollTo-min.js"] = requestHandlers.scrollmin;
handle["/traintimer.appcache"] = requestHandlers.localcache;
handle["/stopwatch3.css"] = requestHandlers.stopwatchcss;
handle["/stopwatch3.js"] = requestHandlers.stopwatch3;
handle["/pouchdb.js"] = requestHandlers.pouchdb;	
handle["/save"] = requestHandlers.saveswimtimes;
handle["/buildswimmers"] = requestHandlers.buildswimmers;
handle["/viewswimtimes"] = requestHandlers.viewswimtimes;		

//console.log(util.inspect(router));	

server.start(router.route, handle);