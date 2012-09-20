/**
* Train TImer
*
* Start node.js  Train Timer
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    0.1.0
*/


/**
* Record swimmer controller class
*
*/
 function SwimtimeController () {
//console.log('the swimmer controller');	 

		this.activetimeclock = new PerSwimmer();
	 
// need to set id of the swimmer thats split or stop has been click on the UI
	 	this.identifyswimmer = function(swimid, clickid) {
		this.identifer = swimid;
		this.clicktype = clickid;
			
		if(clickid != "start" || clickid != "rest" || clickid != "save" ){
	  this.activetimeclock.splitswimmerid(this.identifer);
		}
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
				
			case "save":	
					setsaveallowed = $.cookie("traintimer");
console.log('has cookie been set for save?' + setsaveallowed);		
				//		if(setsaveallowed == "-698696168") {	
									// prepare the data TODO abstract out to a function
									swimdate = $("#swimdate").text();
//console.log(swimdate);	
									swimstyle = $("#swimstyle").val();
//console.log(swimstyle);	
									swimstroke = $("#swimstroke").val();
//console.log(swimstroke);	
									swimtechnique = $("#swimtechnique").val();
//console.log(swimtechnique);	
									swimdistance = $("#swimdistance").val();
//console.log(swimdistance);
									swimsplit = $("#swimsplit").val();
//console.log(swimsplit);	
// form swim data
swimdatastatus = {};
swimdatastatus['swimdate'] = swimdate;
swimdatastatus['swimstroke'] = swimstroke;
swimdatastatus['swimtechnique'] = swimtechnique;
swimdatastatus['swimdistance'] = swimdistance;
swimdatastatus['swimsplit'] = swimsplit;
console.log(swimdatastatus);
				// route to server side URL
				stxt = {};
				stxt['swimstatus'] = swimdatastatus;
				stxt['splitdata'] = this.activetimeclock.sparray;		
				stxtstring =  JSON.stringify(stxt);							
				// make socket send to get real time display anywhere
				var socket = io.connect();
				socket.emit('splitsdatalive', stxtstring);	
					
console.log(stxtstring);
				$.post("/save/" + setsaveallowed, stxtstring ,function(result){
				// put a message back to UI to tell of a successful save TODO
				
				});
			//}
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
		// re enable the drag and drop sorting
		//$("#sortable1").removeClass("droptrue ui-sortable ui-sortable-disabled");
		//$("#sortable1").sortable("enable");
$("#sortable1").sortable( "option", "revert", true );//sortable( "option", "disabled", false );	
		
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
//console.log('how much is viewable in masterstop watch from outside classes');		
//console.log(starttiming.activetimeclock.activesplitter);		
		starttiming.activetimeclock.activesplitter.forEach(function(restswimid)
			{
				starttiming.activetimeclock.spid[restswimid][0] = 1;
				starttiming.activetimeclock.spid[restswimid][1] = 0;
				starttiming.activetimeclock.spid[restswimid][2] = 0;
				starttiming.activetimeclock.sparray[restswimid] = [];
				
//console.log(restswimid);				
			$splivereset = $('#splits'+restswimid);
			//$splivereset.slideUp('fast', function() {
				$splivereset.empty();
				$splivereset.append("<li></li>");

//			});	
				// reset the local splitter array holder for each swimmer

				
		});
		// and this needs move to per swimmer basis
		this.t[7] = 0;
		//starttiming.activetimeclock.spid = {};
		//starttiming.activetimeclock.list3 = [];
		//starttiming.activetimeclock.activesplitter = {};
		starttiming.activetimeclock.splitswimmerid(0);
		
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
				
// disable drag and drop when start press, then reset when stopped.
		$("#sortable1").sortable( "option", "disabled", true );			
		this.swiminterval = '';
		this.swiminterval = $("#swiminterval").val();
console.log('time interval set');
console.log(this.swiminterval)
		
// need to identify active swimmers from UI
			// what order did the swimmers go off 
		this.activeswimmers = [];
		var noswimmerlive = $("a#stop").length;
console.log('the number of #stop ids in live');		
console.log(noswimmerlive);
console.log('the number of #stop ids in live');		

		var listactives = [];
	  //$("#sortable1 .ui-state-default").each(function(){
	    //listactives.push($(this).attr('id'));
	 // });
		var listactives = $('#sortable1').sortable('toArray');
console.log(listactives);
countswimmers = listactives.length;
console.log(countswimmers);		
this.activeswimmers = listactives;

		
//console.log('start of start');		
//console.log(this.t);	
		this.t[this.t[2]] = (+new Date()).valueOf();
//console.log(this.t);

		this.t[2] = 1 - this.t[2];
//console.log(this.t);
			if (this.t[2] == 0) {
	// a split time being set
			clearInterval(this.t[4]);
			this.t[3] += this.t[1] - this.t[0];
		
			this.$start.text(this.startText);
		
			this.t[7]++;
		
		//t[4] = t[1] = t[0] = 0;
//console.log(this.t);		
			this.display();
		}
		else {
//console.log('else start');			
//console.log(this.t);
			this.$start.text(this.stopText);
						
			this.t[4] =  setInterval(this.displaymaster, 43);
//console.log('after setinterval 43');
//console.log(this.t);			
		}
		
		return false;
	},
	
	
	this.savetocouch = function () {
		
	
	}
	
};
	
	
/**
*  Per swimmer timer class 
*  acting as sub class of Master Timer
*/	
var PerSwimmer = function() {

	this.startclock = new MasterWatch();
//	this.swimmer = swimid;	
	

	
// need to identify swimmer split or stop that has been clicked on the UI
	 	this.splitswimmerid = function(splitid) {
		this.splitidlive = splitid;	
//console.log('what id is present ??');
//console.log(this.splitidlive);			
  	
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
			this.spid = {};	
			this.sparray = {};	
			}
			
// if an individual swimmer id array has not been set set it
		if(!this.spid[this.splitidlive]){			
//console.log('should be only first time set of this');			
		this.spid[this.splitidlive] =  [1,0,0];
		this.sparray[this.splitidlive] =  [];	
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
console.log('start of stop');
console.log(this.startclock.t[1]);
// contorl logic, has the main timer been started? If you proceed if not do nothing.		
	if(this.startclock.t[1] == 0) {
		// nothing start do nothing.
	}
	else
	{
	console.log('what t arrays are set start after resetbutton pressed?');
	console.log(this.startclock.t);
	// form stop location div
			$splitslive = '#splits'+stoploc;
	//console.log($splitslive);
			$stoplive = '#stop'+stoploc;
	//console.log($stoplive);
			this.t =  this.startclock.t;
//console.log('reform t from master clock');
//console.log(this.t);
			
			this.t[this.t[2]] = (+new Date()).valueOf();
//console.log(this.t[this.t[2]]);
//console.log('stop function called');		
//console.log(this.t);
	// need to make this stop logic local to this swimmer
			this.spid[this.splitidlive][0] = 1 - this.spid[this.splitidlive][0];

console.log('vales of spid pre a logic if check');		
console.log(this.spid);		
console.log(this.t);
			
				if (this.spid[this.splitidlive][0] == 0) {
	
					
	// make the total time elasped in ms local to this swimerid
				// what order did this swimmer go off?
				swimpos = this.startclock.activeswimmers.indexOf(stoploc);
console.log('swim position');
console.log(swimpos);				
				// order position times interval time period
				stoplag = swimpos * (this.startclock.swiminterval * 1000);
console.log('split lag to deduct');
console.log(stoplag);				
				stoptimelive = this.t[1] - this.t[0] - stoplag;
					
				this.spid[this.splitidlive][1] = stoptimelive;
				this.sparray[this.splitidlive].push(this.spid[this.splitidlive][1]);	
					
//console.log('is $start being formed???');				
//console.log(this.startclock.$start);			
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
			/*
			this.lookup = {};
			this.ll = 0;
			this.list3 = [];
			 for (var j in this.activesplitter) {
				this.lookup[this.activesplitter[j]] = this.activesplitter[j];
			}
				for (var i in this.stoppedlist) {
				if (typeof this.lookup[this.stoppedlist[i]] != 'undefined') {
console.log('found ' + this.stoppedlist[i] + ' in both lists');

//console.log(this.ll);				
					this.list3[this.ll] = this.stoppedlist[i]
				this.ll++	
	 } 		
	 }
console.log('array to compare');
console.log(this.list3);
console.log(this.activesplitter);
console.log(this.lookup);
	*/
	 
		if(this.stoppedlist.length == (this.startclock.activeswimmers.length)){
		// stop the main stopwatch
console.log('all watches have been stopped');		
			clearInterval(this.t[4]);
		// /reset/clear stoppedlist counter
			this.stoppedlist = [];
		}	
	}	
	},

/**
*  Splits and calculations	
* 
*/	
	this.split = function(spidin) {
console.log('split clicked');	
	// contorl logic, has the main timer been started? If yes proceed if not do nothing.		
	if(this.startclock.t[1] == 0) {
		// nothing start do nothing.
	}
	else
	{	
		
		this.t =  this.startclock.t;	
//console.log(this.t);
		//form div id
		$splive = '#splits'+spidin;
//console.log($splive);		
			
	// need array to hold each swimmer id along with their times/splits info.
//console.log('the local split/time array data');	
//console.log(this.spid);
//console.log(this.spid[1]);	
	this.t[2] = 1;		
			if (this.t[2] !== 0) {
				this.spid[spidin][2]++;
				
console.log('from within if in split');	
console.log(this.spid);
//console.log(this.spid[1]);				
console.log(this.t);				
				// what order did this swimmer go off?
				swimpos = this.startclock.activeswimmers.indexOf(spidin);
console.log('swim position');
console.log(swimpos);				
				// order position times interval time period
				splitlag = swimpos * (this.startclock.swiminterval * 1000);
console.log('split lag to deduct');
console.log(splitlag);				
				splittimelive = this.t[3] + this.t[1] - this.t[0] - splitlag;
				
				this.spid[this.splitidlive][1] = splittimelive;
				this.sparray[this.splitidlive].push(this.spid[this.splitidlive][1]);
				
				$($splive).show();
				$('<li><span>' + this.startclock.zero(this.spid[spidin][2]) + '</span> ' + this.startclock.format(splittimelive) + '</li>').appendTo($($splive)).slideDown('fast');
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
	var today = new Date();

		$("#swimdate").text(today);
	
	// sigin modal
	loginhtml = '';
	loginhtml += '<div>Welcome, to Train Timer - an open sport project</div>';
	loginhtml += '<form method="post" action="#" id="siginform" >';
	loginhtml += '<div><label for="name">Username</label><input id="name" class="text ui-widget-content ui-corner-all" type="text" name="name" size="16" ></div>';
	loginhtml += '<div><label for="password">Password</label><input id="password" class="text ui-widget-content ui-corner-all" type="password" value="" name="password" size="16" ></div></form>';
	loginhtml += '<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"> <div class="ui-dialog-buttonset"><button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false"><span class="ui-button-text">Sign me in</span></button></div></div><div id="responsemessage"></div>';
loginpassed = '';
	var $dialog = $('<div id="siginform" ></div>')
		.html(loginhtml)
		.dialog({
			autoOpen: false,
			height: 300,
			width: 260, 
			title: 'Signin to Train Timer',
			buttons: {
										"Sign me in": function() {
											// need to make couchdb call to accept user details
//console.log('validation of the form signin');
									
										usernamein = '';
										passwordin = '';
										usernamein = $("#name").val();
										passwordin = $("#password").val();	
//console.log(usernamein);
//console.log(passwordin);	
										signtxt = {};
										signtxt['username'] = usernamein;
										signtxt['password'] = passwordin;		
										signstring =  JSON.stringify(signtxt);	
										// make has string
										hashCode = function(str){
												var hash = 0;
												if (str.length == 0) return hash;
												for (i = 0; i < str.length; i++) {
														char = str.charCodeAt(i);
														hash = ((hash<<5)-hash)+char;
														hash = hash & hash; // Convert to 32bit integer
												}
												return hash;
										}
										passwordhash = hashCode(passwordin);
										cookieidhash = hashCode((usernamein + password));									
											
										acceptdetails = '';
		
										$.get("/signin/" + usernamein + '/' + cookieidhash + '/' + passwordhash, function(resultback){
										// put a message back to UI to tell of a successful save TODO
//console.log('what back from node');	
//console.log(resultback);
	
var jsomesata = '';											
												if(resultback == 'passed') {		
//console.log('what does model obejct look like?');
//console.log($dialog.dialog);
												passedsigntest("one");
												$.cookie("traintimer", cookieidhash,  { expires: 7 });
												$("#ifsignedin").show();	
												$("#ifsignedin").html('<a class="menu-text" text="SignOut" title="signout" href="#"  id="signincloser" >Sign-out</a>');
												$dialog.dialog( "close" );
												$("#signinopener").hide();
												}
												else {
console.log('failed');
													$("#responsemessage").html('Signin Failed, try again');
												}
										});											
															
										},
										Cancel: function() {
										$( this ).dialog( "close" );
										},

			}

		});
//console.log('what does model obejct look like?');
//console.log($dialog.dialog);	
porf = '';		
function passedsigntest (porf) {
	
	console.log('is it zero or fail?'+ porf);
}
//console.log('passor fail outside of the function' + porf);		

	$('#signinopener').click(function() {
		$dialog.dialog('open');
		// prevent the default action, e.g., following a link
		return false;
	});
	
	$("#ifsignedin").click(function(e) {
console.log('time to distroy the cookie please');
			e.preventDefault(e);
		 var $sotgt = $(e.target);
//console.log('what tgt look like?');			
        if ($sotgt.is("#signincloser")) {
					$("#ifsignedin").fadeOut("slow");
						//$("#ifsignedin").hide();	
						$("#loadlaneselect").hide();
					$("#sortable1").empty();
					$("#signinopener").show();
	
					
					// need to tell the server of the log out too
						$.get("/signout/" + $.cookie("traintimer"), function(resultout){
							
						});
					$.cookie("traintimer", null);

				}
					
	});
		
		$("#addswimmer").click(function () {
			
			lanelist = 'Lane: <select id="thelaneoptions">';
			lanelist +=	'<option value="1">-</option>';
			lanelist +=	'<option value="1">1</option>';
			lanelist +=	'<option value="2">2</option>';
			lanelist +=	'<option value="3">3</option>';
			lanelist +=	'<option value="4">4</option>';
			lanelist +=	'<option value="5">5</option>';
			lanelist +=	'<option value="6">6</option>';
			lanelist +=	'<option value="7">7</option>';
			lanelist +=	'</select>';
			
 			addswimform = '<form method="post" action="#" id="newmasteradd" >Name<input type="text" id="newmastid" name="swimmername"  size="12" />MID<input type="number" id="newmidid" name="mastersid"  size="6" />' + lanelist + '<input type="submit" value="Add" id="newmasteradd" /></form>';
			$("#newmaster").html(addswimform);
				$("#newmaster").show();
    });

// add swimmer form produced after default layout therefore need to delegate to existing DOM element		
			$("#newmaster").click(function (e) {
				//$("#newmasteradd").click(function (e) {
console.log('save new swimmer clicked');					
//console.log(e);					
				e.preventDefault(e);
				// has the user signed in?
					setsaveallowed = '';
					setsaveallowed = $.cookie("traintimer");
//console.log('has cookie been set?' + setsaveallowed);		
				
				 var $tgt = $(e.target);
//console.log('what tgt look like?');
//console.log($tgt.attr("name"));				
        if ($tgt.is("#newmasteradd")) {
					
					newmastnameis = $("#newmasteradd input#newmastid ").val();
					newmastidis = $("#newmasteradd input#newmidid ").val();	
					newlane = $("#thelaneoptions").val();
					
// need to save new master to couch, name and masters id,  validate unique ID number
					firstsavenewmaster = {};
					firstsavenewmaster['name'] = newmastnameis;
					firstsavenewmaster['swimmerid'] = newmastidis;
					firstsavenewmaster['lanetrain'] = newlane;
					jsonfirstsavenewmaster =  JSON.stringify(firstsavenewmaster);
//console.log('new member jsson');
//console.log(jsonfirstsavenewmaster);			


							$.post("/save/" + setsaveallowed, jsonfirstsavenewmaster ,function(result){
							// put a message back to UI to tell of a successful save TODO
							});					
				
					
				
				$("#newmaster").hide();
// add html code for new swimmer added
var newswimcode = '<li class="ui-state-default"  id="'+ newmastidis +'">';
					newswimcode += newmastnameis + ' HR<input type="number" name="heartrate"  size="4" />SC<input type="number" name="strokecount"  size="4" />';
	newswimcode +=	'<ul id="controls">';
	newswimcode +=	'<li> <br /><a href="#" id="stop" name="'+ newmastidis +'" >Stop</a></li>';
	newswimcode +=	'<li> <br /><a href="#" id="split" name="'+ newmastidis +'" >Split</a></li>';
	newswimcode +=	'</ul>';
	newswimcode +=	'<ul id="splits'+ newmastidis +'" class="splits" >';
	newswimcode +=	'<li></li>';
	newswimcode +=	'</ul></li>';
					
				$("#sortable1").append(newswimcode);
				$("#saveconfirmswimmer").text('new master added');
				$("#saveconfirmswimmer").show();
				$("#saveconfirmswimmer").fadeOut("slow");

				}
			
				});
		
	// load lane of swimmers
		$("#loadlane").click(function () {
			
			setsavedallowed = '';
			setsaveallowed = $.cookie("traintimer");
//console.log('has cookie been set?' + setsaveallowed);		
				
				$("#loadlaneselect").show();
				
				lanelistlive = 'Lane: <select id="thelaneoptions">';
				lanelistlive +=	'<option value="1">-</option>';
				lanelistlive +=	'<option value="1">1</option>';
				lanelistlive +=	'<option value="2">2</option>';
				lanelistlive +=	'<option value="3">3</option>';
				lanelistlive +=	'<option value="4">4</option>';
				lanelistlive +=	'<option value="5">5</option>';
				lanelistlive +=	'<option value="6">6</option>';
				lanelistlive +=	'<option value="7">7</option>';
				lanelistlive +=	'</select>';
				$("#loadlaneselect").html(lanelistlive);
					//$("#loadlane").show();
		
			$("#thelaneoptions").change(function () {
				selectedlanenow = $("#thelaneoptions").val();
	//console.log('yes lane' +selectedlanenow );
				// make post request to get swimmer for this lane and dispaly
					$("#sortable1").load("/buildswimmers/lane/" + selectedlanenow + '/' + setsaveallowed);
				
				});

    });				
				
				
// drag and drop
//console.log('is ul.drop being picked up?');
//console.log($("ul.droptrue"));	
		$("ul.droptrue").sortable({
			connectWith: 'ul',
			opacity: 0.6,
			update : updatePostOrder
		});

		$("#sortable1, #sortable2").disableSelection();
		$("#sortable1, #sortable2").css('minHeight',$("#sortable1").height()+"px");
	
			function updatePostOrder() { 
			var arrorder = [];
				$("#sortable1 .ui-state-default").each(function(){
				arrorder.push($(this).attr('id'));
				});
				$('#postOrder').val(arrorder.join(','));
			}


$("#startsort").click(function (e) {
console.log('stop sort called');
$("#sortable1").sortable( "option", "disabled", false );	

});
	
starttiming = new SwimtimeController();
	
// need to identify which swimmers css markup has been clicked
	$("a").click(function(e){
	   e.preventDefault(e);
var resultord = $('#sortable1').sortable('toArray');
console.log('order after start pressed');		
//console.log(resultord);		
		// dgatea = $swtgt.is("a");
		 idclick = $(this).attr("id");
     idname = $(this).attr("name");	
	
console.log(idclick);
console.log(idname);
   // pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
	  starttiming.identifyswimmer(idname, idclick);
		
	});	
	
	//$("#sortable1").on("myCustomEvent", function(e, myName, myValue){
  //$(this).append(myName + ", hi there!");
     // pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
	//		starttiming.identifyswimmer(idname, idclick);
//});
	
	
	$("#sortable1").on("click", function (e) {
  //  $("a").click(function(e){
	   e.preventDefault(e);
		 var $swtgt = $(e.target);
console.log('find value of delegate');			
//console.log($swtgt);	
		 if ($swtgt.is("a")) {
			idclick = $swtgt.attr("id");
			idname =$swtgt.attr("name");	
	
console.log(idclick);
console.log(idname);
			   //$("#sortable1").trigger("myCustomEvent", [ idclick ]);
//});
			 
   // pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idname, idclick);
		 }
	});
	
//console.log('start whole app');		
//console.log(starttiming);	
});