/**
* Train TImer
*
* Train Timer settings, couchdb
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var ttSettings = function() {
  this.account = {};
	this.account['couchdbname'] = '';
	this.account['couchuser'] = '';
	this.account['couchpwd'] = '';
	this.account['cookieset'] = '';
};


module.exports = ttSettings;