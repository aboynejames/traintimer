/**
* Train TImer
*
* Train Timer settings, html code
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var ttHTML = function() {
	this.template = 'default';

};

ttHTML.prototype.fromswimmers = function(swname, swid) {
				
				var swimstarters = '<li class="ui-state-default"  id="' + swid + '">' + swname + ' HR';
				swimstarters += '<input type="number" name="heartrate"  size="4" />SC<input type="number" name="strokecount"  size="4" />';
				swimstarters +=	'<ul id="controls">';
				swimstarters +=	'<li><a href="#" id="stop" name="' + swid + '" >Stop</a></li>';
				swimstarters +=	'<li><a href="#" id="split" name="' + swid + '" >Split</a></li>';
				swimstarters +=	'</ul>';
				swimstarters +=	'<ul id="splits' + swid + '" class="splits" >';
				swimstarters +=	'<li></li>';
				swimstarters +=	'</ul></li>';
				
				return swimstarters;
			}