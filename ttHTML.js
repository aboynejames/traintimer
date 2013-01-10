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

/*
* Display swimmer live
*/	
ttHTML.prototype.fromswimmers = function(swname, swid) {
				
				var swimstarters = '<li class="ui-state-default"  id="' + swid + '">';

				swimstarters +=	'<div id="perswimmerset" >';
				swimstarters +=	'<ul id="percontrols">';
				//swimstarters +=	'<li><a href="#" id="stop" title="' + swid + '" >Stop</a></li>';
				swimstarters +=	'<li><a href="#" id="split" title="' + swid + '" class="splitbutton' + swid +'" >Split</a></li>';
				swimstarters +=	'</ul>';
				swimstarters +=  '<div id="pername" >' + swname + '</div>';
				swimstarters +=	'</div>';
				swimstarters +=	'<div id="perrealtime" >';
				swimstarters +=	'<ul id="splits' + swid + '" class="splits" >';
				swimstarters +=	'<li></li>';
				swimstarters +=	'</ul>';
				swimstarters +=	'<ul id="analysis' + swid + '" class="analysis" >';
				swimstarters +=	'<li></li>';
				swimstarters +=	'</ul>'; 
				swimstarters +=	'</div>';

				swimstarters += '<div class="peredit">';
				swimstarters += '<a href="" id="pereditid" class="pereditid'+ swid + '" title="' + swid + '" data-statusanalysis="on">Analysis</a> <a href="" id="pereditidremove" title="' + swid + '" class="pereditidremove'+ swid + '">Remove</a>';// HR' + '<input type="number" title="heartrate"  size="4" />SC<input type="number" title="strokecount"  size="4" />';
				swimstarters += '</div><div style="clear:both;"></div>';
	
				swimstarters +=	'<div id="historicalanalysis' + swid + '" class="historicalplace" >';
				//swimstarters +=	 '<div class="splitview" id="splittimeshistorical' + swid + '"></div>';
				//swimstarters +=	 '<div class="splitviewcompare" id="lastcomparesession' + swid + '"></div>';
				swimstarters +=	 '</div>';
		
				swimstarters += '<div style="clear:both;"></div></li> ';
				
				return swimstarters;
			}

/*
* Display checkbox of swimmer
*/	
ttHTML.prototype.checkboxswimmers = function(swname, swid) {
				
				var swimliststarters =  '<input type = "checkbox"   id = "'+swid+'"  class="check-style" value = "'+swname+'"  />'+swname + ' <br >';
	
				return swimliststarters;
			}			

/*
* Display analysis
*/				
ttHTML.prototype.viewdataHeader = function(swimmerlist) {
	
	var viewdatahead = '<br />';
	viewdatahead += '<select id="theswimmerview">';
	viewdatahead += '<option value="-">-</option>';
	
	var swimids = Object.keys(swimmerlist);
	swimids.forEach(function(swlist) {
//console.log(swlist);
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

/*
* Display of splilt and diffence color coded
*/	
	ttHTML.prototype.realtimesplitsdiff = function(thisin, spidint) {
//console.log(thisin);
				$splive = '#splits'+spidint;
				$analysislive = '#analysis'+spidint;
		
				// what order did this swimmer go off?
				swimpos = thisin.startclock.activeswimmers.indexOf(spidint);
		
				// order position times interval time period
				splitlag = swimpos * (thisin.startclock.swiminterval * 1000);
		
				splittimelive = thisin.t[3] + thisin.t[1] - thisin.t[0] - splitlag;
				
				thisin.spid[thisin.splitidlive][1] = splittimelive;
				
				lastsplitpers = thisin.sparray[thisin.splitidlive].slice(-1)[0];
				if(lastsplitpers == undefined)
				{
	//console.log('if bein called');				
					lastsplitpers = splittimelive;
				}
//console.log('previous split time');				
//console.log(lastsplitpers);
				
				thisin.sparray[thisin.splitidlive].push(thisin.spid[thisin.splitidlive][1]);
				// display splits
				var shortsplitreal = thisin.startclock.format(splittimelive).slice(3,11);
				$($splive).show();
				$('<li><span>' + thisin.startclock.zero(thisin.spid[spidint][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($splive)).slideDown('fast');
				$($splive).find('li').removeClass('first last');
				$($splive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				// perform analysis & display

				lastsplitper = thisin.sparray[thisin.splitidlive].slice(-1)[0];
//console.log('current split time');				
//console.log(lastsplitper);				

					lastdifftocompare = thisin.spdiffarray[thisin.splitidlive].slice(-1)[0];
//console.log('last diff what are we seeing' + 	lastdifftocompare);				
				if(lastdifftocompare == undefined)
				{
//console.log('yes if passed');					
					lastsplitpers = 0;
				}
//console.log('last live diff');
//console.log(lastdifftocompare);

				thedifflive = splittimelive - lastsplitpers;
//console.log('now diff');
//console.log(thedifflive);
//console.log(thedifflive - lastdifftocompare);				
				thisin.spdiffarray[thisin.splitidlive].push(thedifflive);
				if(thedifflive > lastdifftocompare ) {
						thecolourdiff = 'red'; }
				else {
						thecolourdiff = 'green'; }
						
					var shortsplitreal = thisin.startclock.format(thedifflive).slice(3,11);
					$($analysislive).show();
					$('<li><span>' + thisin.startclock.zero(thisin.spid[spidint][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($analysislive)).css("color", thecolourdiff).slideDown('fast');
					$($analysislive).find('li').removeClass('first last');
					$($analysislive).find('li:first').addClass('first').end().find('li:last').addClass('last');
					//.css("color", thecolourdiff)
						

}

/*
* Display of splilt and diffence color coded FROM STOP BUTTON
*/	
	ttHTML.prototype.realtimestop = function(thisin, stoploc) {
		
			$splitslive = '#splits'+stoploc;
			$stoplive = '#stop'+stoploc;
			$analysislive = '#analysis'+stoploc;
		
		// make the total time elasped in ms local to this swimerid
				// what order did this swimmer go off?
				swimpos = thisin.startclock.activeswimmers.indexOf(stoploc);
	
				lastsplitpers = '';
				lastsplitpers = thisin.sparray[stoploc].slice(-1)[0];
				// order position times interval time period
				stoplag = swimpos * (thisin.startclock.swiminterval * 1000);
		
				stoptimelive = thisin.t[1] - thisin.t[0] - stoplag;
					
				thisin.spid[stoploc][1] = stoptimelive;
				thisin.sparray[stoploc].push(thisin.spid[stoploc][1]);	
							
				(thisin.startclock.$start).text(thisin.startclock.startText);
				
	// make this stop/split id local to this swimmer				
				thisin.spid[thisin.splitidlive][2]++;
		
		// for splits

				if(lastsplitpers == undefined)
				{
	//console.log('if bein called');				
					lastsplitpers = stoptimelive;
				}
//console.log('previous split time');				
//console.log(lastsplitpers);
				//thisin.sparray[thisin.splitidlive].push(thisin.spid[thisin.splitidlive][1]);		
		
	//console.log('t2 not equal to zero in stop');
					var shortsplitreal = thisin.startclock.format(thisin.spid[stoploc][1]).slice(3,11);
				$($splitslive).show();
				$('<li><span>' + thisin.startclock.zero(thisin.spid[stoploc][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($splitslive)).slideDown('fast');
				$($splitslive).find('li').removeClass('first last');
				$($splitslive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				
				thisin.t[1] = 0;
				thisin.stoppedlist.push(stoploc);
				thisin.startclock.display();
				
								lastsplitper = thisin.sparray[stoploc].slice(-1)[0];
//console.log('current split time');				
//console.log(lastsplitper);				


					lastdifftocompare = thisin.spdiffarray[stoploc].slice(-1)[0];
				if(lastdifftocompare == undefined)
				{
					lastdifftocompare = stoptimelive;
				}
//console.log('last live diff');
//console.log(lastdifftocompare);

				 thedifflive = stoptimelive - lastsplitpers;
//console.log('now diff');
//console.log(thedifflive);
//console.log(thedifflive - lastdifftocompare);				
				thisin.spdiffarray[stoploc].push(thedifflive);
				if(thedifflive > lastdifftocompare ) {
						thecolourdiff = 'red'; }
				else {
						thecolourdiff = 'green'; }
					if(thisin.spid[stoploc][2] == 1 )
					{
						thedifflive = stoptimelive;
					}
					var shortsplitreal = thisin.startclock.format(thedifflive).slice(3,11);
					$($analysislive).show();
					$('<li><span>' + thisin.startclock.zero(thisin.spid[stoploc][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($analysislive)).css("color", thecolourdiff).slideDown('fast');
					$($analysislive).find('li').removeClass('first last');
					$($analysislive).find('li:first').addClass('first').end().find('li:last').addClass('last');
					//.css("color", thecolourdiff)
		
	}
	
	
/*
* Display of Analysis post real time
*/	
ttHTML.prototype.visualiseme = function(livepouch, swimidin, historicaldata) {
//console.log(swimidin);	
//console.log(historicaldata);	
	var lastdataid = {};
	var perswimmerdata = {};
	perswimmersort = {};
	// give back all data capture locally for now
	var perswimmerdata = Object.keys(historicaldata);
	perswimmersort = perswimmerdata.sort(function(a,b){return a-b});
//console.log('the order of time data???order right');
//console.log(perswimmersort);	
	var repcounter = '';
	repcounter = 0;
	
	perswimmersort.forEach(function(perswimmersp) {
//console.log(perswimmersp);		
		repcounter ++;
		// setout new divs
		visualnewdiv = '';
		visualnewdiv += '<div class="splitviewcompare" id="lastcomparesession' + perswimmersp + swimidin + '"></div>';
		visualnewdiv += '<div class="splitviewrep" id="lastrep' + perswimmersp + swimidin + '">' + repcounter +'</div>';
		visualnewdiv += '<div class="splitview" id="splittimeshistorical' + perswimmersp + swimidin + '"></div>';
//console.log('swimmer id coming through' + perswimmersp);		
		$("#historicalanalysis" + swimidin).prepend(visualnewdiv);
		
		var visualdata = '';
		var visualdata = 'Date:' ;
		visualdata += historicaldata[perswimmersp]['swiminfo']['swimdate'];
		visualdata += ' '; 
		visualdata += historicaldata[perswimmersp]['swiminfo']['swimstroke'];
		visualdata += ' ';
		visualdata += historicaldata[perswimmersp]['swiminfo']['swimtechnique'];
		visualdata += ' ';
		visualdata += historicaldata[perswimmersp]['swiminfo']['swimstyle'];
		visualdata += ' ';			
		visualdata += historicaldata[perswimmersp]['swiminfo']['swimdistance'];
		visualdata += ' ';		
		visualdata += historicaldata[perswimmersp]['swiminfo']['swimsplit'];
		visualdata += '<br />';
	
		thesplitdiff = '';
		lastsplitforcompare = '';
		lasttimefornextcalc = '';
		actualsplitdiff = '';
					
		// itterate over each array split and format
			historicaldata[perswimmersp]['splittimes'].forEach(function (speratesplit) {

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
			var shortactualtime = starttiming.activetimeclock.startclock.format(speratesplit).slice(3,11);
			visualdatasph = '<li>' + shortactualtime + ' ' + 'split ' + shortsplit + '</li>';
			$(visualdatasph).css("color", thecolourdiff).prependTo($(" #splittimeshistorical" + perswimmersp + swimidin ));
				
			thecolourdiff = '';
			visualdatasph = '';
			shortsplit = '';
				
			});
			
			$("#splittimeshistorical" + perswimmersp + swimidin).prepend(visualdata);
			
				// visualise the stats between different sessions
			if(lastdataid['datasessionid'])
			{
				// do some analaysis  
				netsetcompare =  lasttimefornextcalc - lastdataid['splitlasttime'];
				if(netsetcompare > 0 ) {
					lasttimegetting = 'slower';
					comparecolor = 'red';					
					var compareshortsplit = starttiming.activetimeclock.startclock.format(netsetcompare).slice(3,11);	
					}
				else {
					lasttimegetting = 'faster';
					comparecolor = 'green';
					var compareshortsplit = (netsetcompare/1000) + ' seconds';
					}
				
				
			$(" #lastcomparesession" + perswimmersp+ swimidin  ).html(' ' +lasttimegetting + ' by ' + compareshortsplit).css("color", comparecolor);
			
			}	
			else
			{
				
			$(" #lastcomparesession" + perswimmersp+ swimidin ).html('can only compare itself');
			
			}
			
			//set data session id for mulit data comparison
			lastdataid['datasessionid'] = perswimmersp;
			lastdataid['splitlasttime'] = lasttimefornextcalc;	
	//console.log(lastdataid);
							
	});  // closes perswimmer data
}
