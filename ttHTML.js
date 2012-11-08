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
			
ttHTML.prototype.viewdataHeader = function(swimmerlist) {
	
	var viewdatahead = '<br />';
	viewdatahead += '<select id="theswimmerview">';
	viewdatahead += '<option value="-">-</option>';
	
	var swimids = Object.keys(swimmerlist);
	swimids.forEach(function(swlist) {
console.log(swlist);
		viewdatahead += '<option value="'+ swlist +'">'+ swimmerlist[swlist] +'</option>';
	
	});
	
	viewdatahead += '</select>';
		
	//viewdatahead += '<select id="thedateview">';
	//viewdatahead += '<option value="0110">1 Oct</option>';
	//viewdatahead += '<option value="0210">2nd Oct</option>';
	//viewdatahead += '<option value="0310">3rd Oct</option>';
	//viewdatahead += '</select>';

	return viewdatahead;
}
			
ttHTML.prototype.visualiseme = function(livepouch, swimidin) {
console.log(swimidin);	
	
	var lastdataid = {};
	// give back all data capture locally for now
	var perswimmerdata = Object.keys(swimidin);
	perswimmersort = perswimmerdata.sort(function(a,b){return a-b});
	perswimmersort.forEach(function(perswimmersp) {
		
		// setout new divs
		visualnewdiv = '';
		visualnewdiv += '<div class="splitview" id="splittimeshistorical' + perswimmersp + '"></div>';
		visualnewdiv += '<div class="splitviewcompare" id="lastcomparesession' + perswimmersp + '"></div>';
		$("#visualisedata").prepend(visualnewdiv);
		
		var visualdata = 'Date of Swim:' ;
		visualdata += swimidin[perswimmersp]['swiminfo']['swimdate'];
		visualdata += ' '; 
		visualdata += swimidin[perswimmersp]['swiminfo']['swimstroke'];
		visualdata += ' ';
		visualdata += swimidin[perswimmersp]['swiminfo']['swimtechnique'];
		visualdata += ' ';
		visualdata += swimidin[perswimmersp]['swiminfo']['swimstyle'];
		visualdata += ' ';			
		visualdata += swimidin[perswimmersp]['swiminfo']['swimdistance'];
		visualdata += ' ';		
		visualdata += swimidin[perswimmersp]['swiminfo']['swimsplit'];
		visualdata += '<br />';
		//visualdata += '<div class="splitview" id="splittimeshistorical' + perswimmersp + '"></div>';
		//visualdata += '<div class="splitviewcompare" id="lastcomparesession' + perswimmersp + '"></div>';
			// now build the splits color coded
	

			
		thesplitdiff = '';
		lastsplitforcompare = '';
		lasttimefornextcalc = '';
		actualsplitdiff = '';
					
		// itterate over each array split and format
			swimidin[perswimmersp]['splittimes'].forEach(function (speratesplit) {

			// do some maths to get difference, if higher colour red, lower colour green
			// if not first number
	//console.log('incoming split time' + speratesplit);	
	//console.log('last splitime if not the first' + lastsplitforcompare);	
			thesplitdiff = '';
			thesplitdiff =  speratesplit - lasttimefornextcalc;
	//console.log('the split diff for this run' + thesplitdiff);			
			actualsplitdiff = speratesplit - lasttimefornextcalc;
			if(thesplitdiff > lastsplitforcompare ) {
			thecolourdiff = 'red'; }
			else {
			thecolourdiff = 'green'; }
	//console.log(thecolourdiff);						
			// last split to keep
			lastsplitforcompare = actualsplitdiff;
			lasttimefornextcalc = speratesplit;
			
			var shortsplit = starttiming.activetimeclock.startclock.format(actualsplitdiff).slice(4,11);
			visualdatasph = '<li>' + starttiming.activetimeclock.startclock.format(speratesplit) + ' ' + 'split ' + shortsplit + '</li>';
			$(visualdatasph).css("color", thecolourdiff).prependTo($(" #splittimeshistorical" + perswimmersp));
				
			thecolourdiff = '';
				
			});
			
			$("#splittimeshistorical" + perswimmersp).prepend(visualdata);
			
				// visualise the stats between different sessions
			if(lastdataid['datasessionid'])
			{
				// do some analaysis  
				netsetcompare =  lasttimefornextcalc - lastdataid['splitlasttime'];
				if(netsetcompare > 0 ) {
					lasttimegetting = 'slower'; 
					var compareshortsplit = starttiming.activetimeclock.startclock.format(netsetcompare).slice(4,11);	
					}
				else {
					lasttimegetting = 'faster';
					var compareshortsplit = (netsetcompare/1000) + ' seconds';
					}
				
				
			$(" #lastcomparesession" + perswimmersp ).html('Getting: ' +lasttimegetting + ' by ' + compareshortsplit);
			
			}	
			else
			{
				
			$(" #lastcomparesession" + perswimmersp).html('last entry can only compare itself');
			
			}
			
			//set data session id for mulit data comparison
			lastdataid['datasessionid'] = perswimmersp;
			lastdataid['splitlasttime'] = lasttimefornextcalc;	
	//console.log(lastdataid);
							
	});  // closes perswimmer data

	
}