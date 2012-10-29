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
	this.lanein = '';

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


pouchdbSettings.prototype.mapQueryname = function(lanein, callbackin) {
console.log('lane number in' + lanein);		
		Pouch(this.account['pouchdbname'], function(err, db) {
//console.log('lane number in pouch' + lanein);				
				function map(lanequery) {
//console.log('lane number in map' + lanequery['lanein']);			
					if(lanequery.lanetrain) {
					emit(lanequery.lanetrain, [lanequery.swimmerid, lanequery.name]);
					}
				}

				db.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);		
				callbackin(response);
			});
		});

};

pouchdbSettings.prototype.mapQuerySplits = function(lanein, callbackin) {
//console.log('lane number in' + lanein);		
		Pouch(this.account['pouchdbname'], function(err, db) {
//console.log('lane number in pouch' + lanein);				
				function map(splitsquery) {
//console.log('lane number in map' + lanequery['lanein']);			
					if(splitsquery.session) {
					emit(splitsquery.swimmerid, splitsquery.session);
					}
				}

				db.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);		
				callbackin(response);
			});
		});

};

pouchdbSettings.prototype.changeLog = function() {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
		db.changes(function(err, response) {
//console.log(response);
			
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

pouchdbSettings.prototype.returndatacallback = function(swimidin) {

historicalswimdata = {};
	// need to query pouch for the data
	// test splits data recall						
	function localDataSPcall(swimidin, callback) {  
						livepouch.mapQuerySplits(swimidin, callback);

					}  
      
					swimprepared = localDataSPcall(swimidin, function(spmap) {

						historicalswimdata = {};	
						//historicalswimdata['swiminfo'] = {};
						//historicalswimdata['splittimes'] = {};	
//console.log('how splits data look after save HTML');
//console.log(spmap['rows']);	
					// itterate over results and pick out the one required	
						spmap['rows'].forEach(function(rowswimrs){
//console.log(rowswimrs['key']);
							if(rowswimrs['key'] == swimidin )
							{
								//stringswnames += rowswimrs['value'][1];
								//pass the lane data to get html ready
								historicalswimdata[rowswimrs['value']['sessionid']] = rowswimrs['value'];
					
								}
						});

//console.log(historicalswimdata);	
						//return historicalswimdata;
				visthedata = liveHTML.visualiseme(livepouch, historicalswimdata);
			
						});	
};