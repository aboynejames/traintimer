/**
* Train TImer
*
* Train Timer settings, pouchDB
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var pouchdbSettings = function() {
  this.account = {};
	this.account['pouchdbname'] = 'idb://traintimer';
	this.account['pouch'] = 'traintimer';

};

// class methods
pouchdbSettings.prototype.bulkSave = function(datain) {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			// Opened a new database
			db.bulkDocs({docs: datain}, function(err, results) {
				// Saved the documents into the database

			});
		});

};

pouchdbSettings.prototype.singleSave = function(datain) {
		
	Pouch(this.account['pouchdbname'], function(err, db) {
		
		db.post(datain, function(err, response) {
		
		});
	});
};

pouchdbSettings.prototype.updateSingle = function(datain) {
		
	Pouch(this.account['pouchdbname'], function(err, db) {
		
		db.post(datain, function(err, response) {
		
		});
	});
};



pouchdbSettings.prototype.allDocs = function() {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
					db.allDocs(function(err, response) {
console.log(response);	
						
					});
		});

};


pouchdbSettings.prototype.getDoc = function(docid) {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
			db.get(docid, function(err, doc) {

console.log(doc);	
				
			});
		});

};


pouchdbSettings.prototype.mapQueryname = function() {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
			function map(traintimer) {
				if(traintimer.name) {
				emit(traintimer.name, traintimer.mid);
				}
			}
			db.query({map: map}, {reduce: false}, function(err, response) {

console.log(response);
				
		});
		});

};


pouchdbSettings.prototype.changeLog = function() {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
		db.changes(function(err, response) {
console.log(response);
			
			});

		});

};


pouchdbSettings.prototype.replicate = function() {

			Pouch.replicate(this.account['pouchdbname'], 'http://localhost:5984/traintimer', function(err, changes) {
  //
			});			

};


pouchdbSettings.prototype.deletePouch = function() {

		Pouch.destroy(this.account['pouchdbname'], function(err, info) {
			// database deleted
		});

};

