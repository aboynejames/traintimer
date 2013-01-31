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
//console.log(response);	
						
					});
		});

};


pouchdbSettings.prototype.getDoc = function(docid) {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
			db.get(docid, function(err, doc) {

//console.log(doc);	
				syncdataforsave =  JSON.stringify(doc);
				$.post("/sync/", syncdataforsave ,function(result){
					// put a message back to UI to tell of a successful sync
//console.log('callback from sync to couchdb via node is complete');	
			
				});
			});
		});

};

pouchdbSettings.prototype.putDoc = function(designdoc) {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
			db.put( designdoc ,  function(err, doc) {

//console.log(doc);	
				
			});
		});

};

/*
*  query all swimmer data in pouch
*/
pouchdbSettings.prototype.mapQueryswimmers = function(callbackin) {
//console.log('lane number in' + lanein);		
		Pouch(this.account['pouchdbname'], function(err, db) {
//console.log('lane number in pouch' + lanein);				
				function map(swimquery) {
					if(swimquery.name) {
						emit(swimquery.lanetrain, [swimquery.swimmerid, swimquery.name]);
					}
				}

				db.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);		
				callbackin(response);
			});
		});

};



pouchdbSettings.prototype.mapQueryname = function(lanein, callbackin) {
//console.log('lane number in' + lanein);		
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

pouchdbSettings.prototype.deleteDoc = function(docid) {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
//console.log(docid);		
		db.get(docid, function(err, docout) {
//console.log('docid returned');
//console.log(docout);			
			db.remove(docout, function(err, response) {
//console.log('remove response');
//console.log(response);				
				
			});
		});
	});

};


pouchdbSettings.prototype.changeLog = function(synccallback) {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
		db.changes(function(err, response) {
//console.log(response);
				synccallback(response);
			});

		});

};


pouchdbSettings.prototype.filterchangeLog = function(callbackin) {
	
		Pouch(this.account['pouchdbname'], function(err, db) {
			
		db.changes( {filter : 'swimmers/justname'}, function(err, response) {
//console.log(response);
			callbackin(response);
			
			
			});

		});

};


pouchdbSettings.prototype.replicate = function() {
//console.log('replication started ouside');	
			Pouch.replicate(this.account['pouchdbname'], 'http://localhost:5984/traintimer/', function(err, changes) {
  //
//console.log('replication started');				
			});			

};


pouchdbSettings.prototype.deletePouch = function() {

		Pouch.destroy(this.account['pouchdbname'], function(err, info) {
			// database deleted
		});

};

pouchdbSettings.prototype.returndatacallback = function(swimidin, datatypein) {

historicalswimdata = {};
	// need to query pouch for the data
	// test splits data recall						
	function localDataSPcall(swimidin, callback) {  
						livepouch.mapQuerySplits(swimidin, callback);

					}  
      
					swimprepared = localDataSPcall(swimidin, function(spmap) {

						historicalswimdata = {};	
							
						// the current swim settings
						swimsetlive = {};
						//swimsetlive["swimdate"] = $("#swimdate").text();
						swimsetlive["swimstyle"] = $("#swimstyle").val();
						swimsetlive["swimstroke"] = $("#swimstroke").val();
						swimsetlive["swimtechnique"] = $("#swimtechnique").val();
						swimsetlive["swimdistance"] = $("#swimdistance").val();
console.log(spmap);							
					// itterate over results and pick out the one required	
						spmap['rows'].forEach(function(rowswimrs){
//console.log(rowswimrs['key']);
							if(rowswimrs['key'] == swimidin )
							{
								// need to set time interval to retrieve
								var timerightnow = new Date();
								startswimdate = Date.parse(timerightnow); // current time/date
								endswimdateperiod = startswimdate - 10800000;  //go back 3 hours
//console.log(endswimdateperiod + 'go back three hours' + startswimdate + 'current time' + 'saveactual time' + rowswimrs['value']['sessionid']);								
								if( rowswimrs['value']['sessionid'] < startswimdate && rowswimrs['value']['sessionid'] > endswimdateperiod)
								{
//console.log('time filter passed');								
									// need a set of filters for time period and swim setting e.g. stroke distance etc
									if(swimsetlive["swimstyle"] ==  rowswimrs['value']['swiminfo']['swimstyle'] && swimsetlive["swimstroke"] ==  rowswimrs['value']['swiminfo']['swimstroke']  && swimsetlive["swimtechnique"] ==  rowswimrs['value']['swiminfo']['swimtechnique'] && swimsetlive["swimdistance"] ==  rowswimrs['value']['swiminfo']['swimdistance'] )
									{
									//pass the lane data to get html ready
										historicalswimdata[rowswimrs['value']['sessionid']] = rowswimrs['value'];
									
									}
								}
							}	
						});
						
							// what is data for
							if(datatypein == "splitdatain")
							{
							//return historicalswimdata;
								visthedata = liveHTML.visualiseme(livepouch, swimidin, historicalswimdata);
								swimidin = '';
								historicalswimdata = '';

							}
							else
							{
								// chart data
								visthedata = liveHTML.visualisechart(livepouch, swimidin, historicalswimdata);
								swimidin = '';
								historicalswimdata = '';
							}
					});
};