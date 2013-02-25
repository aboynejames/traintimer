/**
* Train TImer
*
* routes to request

* @method router
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/

var util = require('util');

/**
* @method route
*/
function route(handle, pathname, response, request, emitter, couchin, couchlive) {
  console.log("About to route a request for " + pathname);

//console.log(util.inspect(pathname));
//console.log('at router leevvveel' + util.inspect(couchin));
	var firstpath=pathname.split("/"); 
console.log(firstpath);
	var pathlive = '/'+firstpath[1];
console.log(pathlive);
  if (typeof handle[pathlive] === 'function') {
    handle[pathlive](firstpath, response, request, emitter, couchin, couchlive);
  }
  else {
console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;