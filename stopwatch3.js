/**
* Train TImer
*
* Start node.js  Train Timer
*
*
* @package    Train Timer part of open source sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    0.1.0
*/


/**
* Record swimmer controller class
*
*/
 function SwimtimeController (theswimmers) {
//console.log('the swimmer controller');	 
	this.activeswimmers = theswimmers;
//console.log(this.activeswimmers);	 
	 	  this.activetimeclock = new PerSwimmer();
	 
// need to set id of the swimmer thats split or stop has been click on the UI
	 	this.identifyswimmer = function(swimid, clickid) {
		this.identifer = swimid;
		this.clicktype = clickid;
			

	  this.activetimeclock.splitswimmerid(this.identifer); 
		this.activetimeclock.startclock.load();	
			
			
			switch(this.clicktype){

			case "start": 
			this.activetimeclock.startclock.startStop();
			break;
				
			case "reset": 
			this.activetimeclock.startclock.reset();
			break;

			case "split":
			this.activetimeclock.split(this.identifer);
			break;

			case "stop":	
			this.activetimeclock.stop(this.identifer);
			break;
			
			}		
 }
 
	
			
}


/**
* Master Stop Watch Class
*
*/
var MasterWatch = function() {
//console.log('master class called');
	// one universal start and reset button
	this.$start = $('#start');
	this.$reset = $('#reset');
	this.$timer = $('#timer');
	this.startText = this.$start.text();
	this.stopText = this.$start.attr('alternate');

	/*
	 * I found this code on a few sites and am unsure of the original author.
	 * If you know please inform me so I can credit them here.
	 *
	 * 0 = start time
	 * 1 = end time
	 * 2 = state (stopped or counting)
	 * 3 = total elapsed time in ms
	 * 4 = timer (interval object)
	 * 5 = epoch (January 1, 1970)
	 * 6 = element (not used here, normally stores the DOM element to update with the time)
	 * 7 = split count
	 */
	this.t = [0, 0, 0, 0, 0, 0, 0, 0];


	this.format = function(ms) {
		var d = new Date(ms + this.t[5]).toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
		var x = String(ms % 1000);
//console.log('formatting x ');
//console.log(x);
		while (x.length < 3) {
			x = '0' + x;
		}
		d += '.' + x;
		return d.substr(0, d.length - 1);
	},
	
	this.zero = function(num) {
		if (parseInt(num) < 0) var neg = true;
		if (Math.abs(parseInt(num)) < 10) {
			num = '0' + Math.abs(num);
		}
		if (neg) num = '-' + num;
		return num;
	},
	

	this.reset = function() {
		// this needs updated to clear all splits for multiple active swimmers
		
		if (this.t[2]) {
			this.startStop();
		}
		
		this.t[4] = this.t[3] = this.t[2] = this.t[1] = this.t[0] = 0;
		
		this.display();
		
		this.$start.text(this.startText);
		
//	needs moving to per swimmer splits function
		//liverestids = [1,2,3];
			//activeswimmers
console.log('how much is viewable in masterstop watch from outside classes');		
console.log(starttiming.activetimeclock.activesplitter);		
		starttiming.activetimeclock.activesplitter.forEach(function(restswimid)
			{
console.log(restswimid);				
			$splivereset = $('#splits'+restswimid);
			//$splivereset.slideUp('fast', function() {
				$splivereset.empty();
//			});	
		});
		// and this needs move to per swimmer basis
		this.t[7] = 0;
		starttiming.activetimeclock.spid = 0;
		
		return false;
	},
	
	this.display = function() {
		if (this.t[2]) {
//console.log('display function called and if t2');
			this.t[1] = (new Date()).valueOf();
		}
//console.log('display function set timer after formatting time.');		
		this.$timer.text(this.format(this.t[3] + this.t[1] - this.t[0]));
	},
	
	
	this.displaymaster = function() {
//console.log('display master started');	
//console.log(this.t);
		
		this.delaymaster = starttiming.activetimeclock.startclock.t;
//console.log('can t array be formed from source??)');
//console.log(this.delaymaster);
//console.log(this.delaymaster[2]);		
		
		if (this.delaymaster[2]) {
//console.log('display function called and if t2');
			this.delaymaster[1] = (new Date()).valueOf();
		}
		
		 starttiming.activetimeclock.startclock.$timer.text(starttiming.activetimeclock.startclock.format(this.delaymaster[3] + this.delaymaster[1] - this.delaymaster[0]));
	},
	
	this.load = function() {
		this.t[5] = new Date(1970, 1, 1, 0, 0, 0, 0).valueOf();

		this.display();
	},
	
	this.startStop = function() {
console.log('start of start');		
console.log(this.t);	
		this.t[this.t[2]] = (+new Date()).valueOf();
console.log(this.t);

		this.t[2] = 1 - this.t[2];
console.log(this.t);
			if (this.t[2] == 0) {
	// a split time being set
			clearInterval(this.t[4]);
			this.t[3] += this.t[1] - this.t[0];
		
			this.$start.text(this.startText);
		
			this.t[7]++;
		
		//t[4] = t[1] = t[0] = 0;
	console.log(this.t);		
			this.display();
		}
		else {
//console.log('else start');			
//console.log(this.t);
			this.$start.text(this.stopText);
						
			this.t[4] =  setInterval(this.displaymaster, 43);
console.log('after setinterval 43');
console.log(this.t);			
		}
		
		return false;
	}
	
};
	
	
/**
*  Per swimmer timer class 
*  sub class of Master Timer
*/	
var PerSwimmer = function() {

	this.startclock = new MasterWatch();
//	this.swimmer = swimid;	
	

	
// need to identify swimmer split or stop that has been clicked on the UI
	 	this.splitswimmerid = function(splitid) {
		this.splitidlive = splitid;	
console.log('what id is present ??');
console.log(this.splitidlive);			
  	
// keep track of the live split swimmers that are active
			if(!this.activesplitter)
			{
			this.activesplitter = [];
			}
// keep track of how many times the stop button has been click
			if(!this.stoppedlist)
			{
			this.stoppedlist = [];
			}
			
			if(!this.activesplitter[this.splitidlive]){
				this.activesplitter.push(this.splitidlive);
			}
			
			
// need to defin array for all local split stop times array
			if(!this.spid)
			{
			this.spid = [];	
			}
			
// if an individual swimmer id array has not been set set it
		if(!this.spid[this.splitidlive]){			
console.log('should be only first time set of this');			
		this.spid[this.splitidlive] =  [1,0,0];
//console.log('the local split/time array data');	
//console.log(this.spid);
//console.log(this.spid[1]);			
	/*
	 * setting for each swimmer  array of array [idofswimmer][splits time where:
	 *
	 * 0 = default swimmer time is set to 1 i.e. live
	 * 1 = total time elapse in ms for each stop / split?  need to check for split logic
	 * 2 = the stop/split number local to each swimmer
	*/		
		}	
	}	

	
	this.stop = function(stoploc) {

// contorl logic, has the main timer been started? If you proceed if not do nothing.		
	if(this.startclock.t[1] == 0) {
		// nothing start do nothing.
	}
	else
	{
		
		
	// form stop location div
			$splitslive = '#splits'+stoploc;
	//console.log($splitslive);
			$stoplive = '#stop'+stoploc;
	//console.log($stoplive);
			this.t =  this.startclock.t;
	console.log('reform t from master clock');
	console.log(this.t);
			
			this.t[this.t[2]] = (+new Date()).valueOf();
	console.log(this.t[this.t[2]]);
	console.log('stop function called');		
	console.log(this.t);
	// need to make this stop logic local to this swimmer
			this.spid[this.splitidlive][0] = 1 - this.spid[this.splitidlive][0];

	console.log(this.t);
			
				if (this.spid[this.splitidlive][0] == 0) {
				
	// the master clock should not be cleared unless this is the last swimmerid to be stopped.				
					//clearInterval(this.t[4]);
					
	// make the total time elasped in ms local to this swimerid				
				this.spid[this.splitidlive][1]+= this.t[1] - this.t[0];
	console.log('is $start being formed???');				
	console.log(this.startclock.$start);			
				(this.startclock.$start).text(this.startclock.startText);
				
	// make this stop/split id local to this swimmer				
				this.spid[this.splitidlive][2]++;
	console.log('t2 not equal to zero in stop');
	console.log(this.t);
				$($splitslive).show();
				$('<li><span>' + this.startclock.zero(this.spid[this.splitidlive][2]) + '</span> ' + this.startclock.format(this.spid[this.splitidlive][1]) + '</li>').appendTo($($splitslive)).slideDown('fast');
				$($splitslive).find('li').removeClass('first last');
				$($splitslive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				
				this.t[1] = 0;
				this.stoppedlist.push(stoploc);
				this.startclock.display();
			}
	// lastly if all the stop buttons have been pressed stop the mainstopwatch.
			this.lookup = {};
			this.ll = 0;
			this.list3 = [];
			 for (var j in this.activesplitter) {
				this.lookup[this.activesplitter[j]] = this.activesplitter[j];
			}
				for (var i in this.stoppedlist) {
				if (typeof this.lookup[this.stoppedlist[i]] != 'undefined') {
						console.log('found ' + this.stoppedlist[i] + ' in both lists');

	console.log(this.ll);				
					this.list3[this.ll] = this.stoppedlist[i]
				this.ll++	
	 } 		
	 }
	console.log('array to compare');
	console.log(this.list3);
	console.log(this.activesplitter);
	 
	 
		if(this.list3.length == (this.activesplitter.length-1)){
		// stop the main stopwatch
	console.log('all watches have been stopped');		
			clearInterval(this.t[4]);
		}	
	}	
	},

	
	this.split = function(spidin) {
console.log('split clicked');	

	// contorl logic, has the main timer been started? If you proceed if not do nothing.		
	if(this.startclock.t[1] == 0) {
		// nothing start do nothing.
	}
	else
	{	
		
		
		this.t =  this.startclock.t;	
			
	console.log(this.t);
		//form div id
		$splive = '#splits'+spidin;
	console.log($splive);		
			
	// need array to hold each swimmer id along with their times/splits info.
	console.log('the local split/time array data');	
	console.log(this.spid);
	console.log(this.spid[1]);	
	this.t[2] = 1;		
			if (this.t[2] !== 0) {
				this.spid[spidin][2]++;
				
	console.log('from within if in split');	
	console.log(this.spid);
	console.log(this.spid[1]);				
				
				
				$($splive).show();
				$('<li><span>' + this.startclock.zero(this.spid[spidin][2]) + '</span> ' + this.startclock.format(this.t[3] + this.t[1] - this.t[0]) + '</li>').appendTo($($splive)).slideDown('fast');
				$($splive).find('li').removeClass('first last');
				$($splive).find('li:first').addClass('first').end().find('li:last').addClass('last');
			}
			
			return false;
		}	
	}

	
}; // closes Per Swimmer


/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){

console.log('start new timer object');	

// need to identify active swimmer from UI
activeswimmers = [];
activeswimmers = [1,2,3];

starttiming = new SwimtimeController(activeswimmers);
	
// need to identify which swimmers css markup has been click
	$("a").click(function(e){
console.log(this);        
	e.preventDefault(e);
	idclick = $(this).attr("id");
  idname = $(this).attr("name");
$("#hmtt").text(idname);

console.log(idclick);
console.log(idname);
// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
	starttiming.identifyswimmer(idname, idclick);

	});
	
console.log('start whole app');		
console.log(starttiming);	
});