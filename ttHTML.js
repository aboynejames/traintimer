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
			//	swimstarters += ' HR' + '<input type="number" name="heartrate"  size="4" />SC<input type="number" name="strokecount"  size="4" />';
				swimstarters +=	'<div id="perswimmerset" >';
				swimstarters +=	'<ul id="percontrols">';
				swimstarters +=	'<li><a href="#" id="stop" name="' + swid + '" >Stop</a></li>';
				swimstarters +=	'<li><a href="#" id="split" name="' + swid + '" >Split</a></li>';
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
				swimstarters += '</li>';
				
				return swimstarters;
			}

/*
* Display checkbox of swimmer
*/	
ttHTML.prototype.checkboxswimmers = function(swname, swid) {
				
				var swimliststarters =  '<input type = "checkbox"   id = "'+swid+'"  value = "'+swname+'"  />'+swname + ' <br >';
	
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

/*
* Display of Analysis post real time
*/	
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

/*
* Display of splilt and diffence color coded
*/	
	ttHTML.prototype.realtimesplitsdiff = function(thisin, spidint) {

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
	console.log('if bein called');				
					lastsplitpers = splittimelive;
				}
console.log('previous split time');				
console.log(lastsplitpers);
				
				thisin.sparray[thisin.splitidlive].push(thisin.spid[thisin.splitidlive][1]);
				// display splits
					var shortsplitreal = thisin.startclock.format(splittimelive).slice(3,11);
				$($splive).show();
				$('<li><span>' + thisin.startclock.zero(thisin.spid[spidint][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($splive)).slideDown('fast');
				$($splive).find('li').removeClass('first last');
				$($splive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				// perform analysis & display

				lastsplitper = thisin.sparray[thisin.splitidlive].slice(-1)[0];
console.log('current split time');				
console.log(lastsplitper);				


					lastdifftocompare = thisin.spdiffarray[thisin.splitidlive].slice(-1)[0];
				if(lastdifftocompare == undefined)
				{
					lastdifftocompare = 0;
				}
console.log('last live diff');
console.log(lastdifftocompare);

				thedifflive = splittimelive - lastsplitpers;
console.log('now diff');
console.log(thedifflive);
console.log(thedifflive - lastdifftocompare);				
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
	console.log('if bein called');				
					lastsplitpers = splittimelive;
				}
console.log('previous split time');				
console.log(lastsplitpers);
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
console.log('current split time');				
console.log(lastsplitper);				


					lastdifftocompare = thisin.spdiffarray[stoploc].slice(-1)[0];
				if(lastdifftocompare == undefined)
				{
					lastdifftocompare = 0;
				}
console.log('last live diff');
console.log(lastdifftocompare);

				thedifflive = stoptimelive - lastsplitpers;
console.log('now diff');
console.log(thedifflive);
console.log(thedifflive - lastdifftocompare);				
				thisin.spdiffarray[stoploc].push(thedifflive);
				if(thedifflive > lastdifftocompare ) {
						thecolourdiff = 'red'; }
				else {
						thecolourdiff = 'green'; }
					
					var shortsplitreal = thisin.startclock.format(thedifflive).slice(3,11);
					$($analysislive).show();
					$('<li><span>' + thisin.startclock.zero(thisin.spid[stoploc][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($analysislive)).css("color", thecolourdiff).slideDown('fast');
					$($analysislive).find('li').removeClass('first last');
					$($analysislive).find('li:first').addClass('first').end().find('li:last').addClass('last');
					//.css("color", thecolourdiff)
		
	}