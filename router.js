var util = require('util');


function route(handle, pathname, response, request, emitter, couchin) {
  console.log("About to route a request for " + pathname);

//console.log(util.inspect(pathname));
//console.log('at router leevvveel' + util.inspect(couchin));
	var firstpath=pathname.split("/"); 
console.log(firstpath);
	var pathlive = '/'+firstpath[1];
console.log(pathlive);
  if (typeof handle[pathlive] === 'function') {
    handle[pathlive](firstpath, response, request, emitter, couchin);
  }
  else {
console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;