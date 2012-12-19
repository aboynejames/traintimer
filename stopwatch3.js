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
console.log('clickid= ' + this.clicktype);
console.log('name = ' + this.identifer);		
		this.activetimeclock.startclock.load();	
			
		if(clickid != "start" || clickid != "rest" || clickid != "save" ){
	  this.activetimeclock.splitswimmerid(this.identifer);
		}
						
			switch(this.clicktype){

			case "start": 
			this.activetimeclock.startclock.startStop();
			break;
			
			case "split":
			this.activetimeclock.split(this.identifer);
			break;

			case "stop":	
			this.activetimeclock.stop(this.identifer);
			break;
				
			case "reset": 
			this.activetimeclock.startclock.reset();
			break;
				
			case "save":	
					setsaveallowed = $.cookie("traintimer");
									$("#confirmsave").show();
									$("#confirmsave").text('Saved');
									$("#confirmsave").fadeOut(1000);
									// prepare the data TODO abstract out to a function
									var sptoday = new Date();
									datesplitnumber = Date.parse(sptoday);//Date.parse(cleandata["swimstatus"]['swimdate']);
									
									swimstyle = $("#swimstyle").val();
									swimstroke = $("#swimstroke").val();
									swimtechnique = $("#swimtechnique").val();
									swimdistance = $("#swimdistance").val();
									swimsplit = $("#swimsplit").val();
									// form swim data
									swimdatastatus = {};
									swimdatastatus['swimdate'] = sptoday;
									swimdatastatus['swimstyle'] = swimstyle;
									swimdatastatus['swimstroke'] = swimstroke;
									swimdatastatus['swimtechnique'] = swimtechnique;
									swimdatastatus['swimdistance'] = swimdistance;
									swimdatastatus['swimsplit'] = swimsplit;

								// route to server side URL
								stxt = {};
								stxt['swimstatus'] = swimdatastatus;
								stxt['splitdata'] = this.activetimeclock.sparray;		
								stxtstring =  JSON.stringify(stxt);											
								// make socket send to get real time display anywhere
								//var socket = io.connect();
								//socket.emit('splitsdatalive', stxtstring);	
									
								// save to localpouchdb need to prepare buld array json structure 
									cleandatakey = {};
									bulksplits = [];
									i = 0;
								cleandatakey= Object.keys(stxt['splitdata']);
								cleandatakey.forEach(function(bulkkey){
									newjsonswim = {};

								if(stxt['splitdata'][bulkkey].length > 0 ) 
								{									

									newjsonswim["swimmerid"] = '';
									newjsonswim["session"] = {};
									activesplitsb  = [];	
									activesplitsb = stxt['splitdata'][bulkkey]
									newjsonswim["swimmerid"] = bulkkey;
									newjsonswim["session"]["sessionid"] = datesplitnumber;	
									newjsonswim["session"]["swiminfo"] = stxt['swimstatus'];	
									newjsonswim["session"]["splittimes"]	= activesplitsb;
									
									//livepouch.singleSave(newjsonswim);
									bulksplits[i] = newjsonswim;
									i++
									}		
									// collect array and then do bulk save as single saving timing out.

								});

									livepouch.bulkSave(bulksplits);
							
								setsaveallowed = 
								$.post("/save/" + setsaveallowed, stxtstring ,function(result){
								// put a message back to UI to tell of a successful save TODO
								
								});
			break;
				
				case "addswimmer":
								
					addswimmerstatus = $("#addswimmer").attr("name");
console.log(addswimmerstatus);
					if(addswimmerstatus == 'on') {
										
						lanelist = '<select id="thelaneoptionsnew" class="lanewidthnew">';
						lanelist +=	'<option  selected="-" value="-1">-</option>';
						lanelist +=	'<option value="1">1</option>';
						lanelist +=	'<option value="2">2</option>';
						lanelist +=	'<option value="3">3</option>';
						lanelist +=	'<option value="4">4</option>';
						lanelist +=	'<option value="5">5</option>';
						lanelist +=	'<option value="6">6</option>';
						lanelist +=	'<option value="7">7</option>';
						lanelist +=	'<option value="8">8</option>';
						lanelist +=	'<option value="9">9</option>';
						lanelist +=	'<option value="10">10</option>';
						lanelist +=	'</select>';
							
						addswimform = '<form class="addswimmer-form" method="post" action="#" id="newmasteradd" >';
						addswimform += '<ul><li>Enter name and allocate to a lane</li>';
						addswimform += '<li><label for="name">Name:</label><input type="text"  id="newmastid" name="swimmername" required /><span class="form_hint">Please enter a name</span></li>';

						addswimform += '<li><label for="lane">Lane:</label>' + lanelist + '<span class="form_hint">Set a lane number</span></li>';
						addswimform += '<li><button class="submit" type="submit"  id="newmasteradd" >Add swimmer</button></li></ul></form>';
						addswimform += '<div id="newswimerror"></div>';						
						$("#newmaster").html(addswimform);
						$("#newmaster").show();						
						$("#addswimmer").attr("name", "off");
					}
					else
					{
						$("#newmaster").hide();
						$("#addswimmer").attr("name", "on");
					}			
				break;
				
				case "loadlane":
				
					setsavedallowed = '';
					loadname = '';
					//setsaveallowed = $.cookie("traintimer");
//console.log('has cookie been set?' + setsaveallowed);
					loadname = $("#loadlane").attr("name");
console.log('loadlane on off::::' + loadname );
					if(loadname == 'on') {
						$("#loadlane").attr("name", "off");
						$("#thelaneoptions").val(-1);
						$("#theswimmeroptions").val(-1);
						$("#loadlaneselect").show();
						$("#loadswimmers").show();
						$("#loadclearswimmers").show();
					}
					else
					{
					// close the load	
						$("#loadlaneselect").hide();
						$("#loadlaneselect").hide();
						$("#loadswimmers").hide();
						$("#loadclearswimmers").hide();
						$("#loadlane").attr("name", "on");
					}
				break;
				
				case "startsort":
				
				$("#sortable1").sortable( "option", "disabled", false );	
				
				break;
				/*
				case "signinopener":
				
					// sigin modal
	loginhtml = '';
	loginhtml += '<div>Welcome, to Train Timer </div>';
	loginhtml += '<form method="post" action="#" id="siginform" >';
	loginhtml += '<div><label for="name">Username</label><input id="name" class="text ui-widget-content ui-corner-all" type="text" name="name" size="16" ></div>';
	loginhtml += '<div><label for="password">Password</label><input id="password" class="text ui-widget-content ui-corner-all" type="password" value="" name="password" size="16" ></div></form>';
	loginhtml += '<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"> <div class="ui-dialog-buttonset"><button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false"><span class="ui-button-text">Sign me in</span></button></div></div><div id="responsemessage"></div>';

	var $dialog = $('<div id="siginform" ></div>')
		.html(loginhtml)
		.dialog({
			autoOpen: false,
			height: 340,
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
								//		signtxt = {};
									//	signtxt['username'] = usernamein;
										//signtxt['password'] = passwordin;		
									//	signstring =  JSON.stringify(signtxt);	
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
										cookieidhash = hashCode((usernamein + passwordin));									
											
										acceptdetails = '';
		
										$.get("/signin/" + usernamein + '/' + cookieidhash + '/' + passwordhash, function(resultback){
										// put a message back to UI to tell of a successful save TODO
											/*acceptdetails = resultback;
							
												var jsomesata = '';											
												if(acceptdetails['signin'] == 'passed') {		
												//passedsigntest("one");
												$.cookie("traintimer", cookieidhash,  { expires: 7 });
												$("#ifsignedin").show();	
												$("#ifsignedin").html('<a class="menu-text" text="SignOut" title="signout" href="#"  id="signincloser" >Sign-out</a>');
												$dialog.dialog( "close" );
												$("#signinopener").hide();
												$("#sortable1").empty();
												
												usernamein = '';
												passwordin = '';
												passwordhash = '';
										    cookieidhash = '';
												setsavedallowed = '';
												setsaveallowed = '';
												signtxt = '';		
												signstring =  '';
												
//console.log('all reset???' + usernamein + passwordin + passwordhash + cookieidhash + setsavedallowed + setsaveallowed + signtxt + signstring);												
												}
												else {
//console.log('failed');
													$("#responsemessage").html('Signin Failed, try again');
												}
											});	
															
										},
										Cancel: function() {
										$( this ).dialog( "close" );
										},

			}

		});

		$dialog.dialog('open');
		// prevent the default action, e.g., following a link
		return false;
				
				break;
		*/
			case "viewdata":
			// needs swimmerids and names
				$("#sortable1").empty();
							
				analysisname = $("#viewdata").attr("name");
console.log('analysislane on off::::' + analysisname );
					if(analysisname == 'on') {
						
						$("#viewdata").attr("name", "on");
		
							// lane selected (make swimmers that are live? TODO)
						// if lane do this, if alpha added do ..  or get list of live TODO.
							selectedlanenow = $("#thelaneoptions").val();  // lane
							if(selectedlanenow == -1 ) {
								
									 // individual swimmer
								// form array id and swimmer name
								alphaswimmerin = {};
								alphaswimmerin[swimidalpha] = swimnamealpha;	
								datahead = liveHTML.viewdataHeader(alphaswimmerin);
								$("#viewdatalive").html(datahead);
						
							}
							else {
								
								function localDatacall(selectedlanenow, callback) {  
								livepouch.mapQueryname(selectedlanenow, callback);
								}  

								localDatacall(selectedlanenow, function(rtmap) {  

								presentswimmerlist = {};
												
								rtmap["rows"].forEach(function(rowswimrs){
			//console.log(rowswimrs);
									if(rowswimrs['key'] == selectedlanenow )
									{	
							
									//pass the lane data to get html ready
										presentswimmerlist[rowswimrs['value'][0]] = rowswimrs['value'][1];
										
									}
								});
								// pass along for html formatting
								datahead = liveHTML.viewdataHeader(presentswimmerlist);
								$("#viewdatalive").html(datahead);
								});
								
							
							}
						
					}
						else {
							$("#viewdatalive").empty();
							$("#visualisedata").empty();
							$("#viewdata").attr("name", "on");
							
						}

			break;
				
			case "setshow":
			// hide or show the set settings
					setshowstatus = $("#setshow").attr("name");
console.log(setshowstatus);
					if(setshowstatus == 'on') {
						$(".swimsettings").show();
						$("#setshow").attr("name", "off");
					}
					else
					{
						$(".swimsettings").hide();
						$("#setshow").attr("name", "on");
					}
						
	
			break;
						
			} // closes switch		
			
 } // closes id function
			
}  // closes controller class


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
$("#sortable1").sortable( "option", "revert", true );//sortable( "option", "disabled", false );	
		
		// this needs updated to clear all splits for multiple active swimmers
		
		if (this.t[2]) {
			this.startStop();
		}
		
		this.t[4] = this.t[3] = this.t[2] = this.t[1] = this.t[0] = 0;
		
		this.display();
		
		this.$start.text(this.startText);
		
//	needs moving to per swimmer splits function

		starttiming.activetimeclock.activesplitter.forEach(function(restswimid)
			{
				starttiming.activetimeclock.spid[restswimid][0] = 1;
				starttiming.activetimeclock.spid[restswimid][1] = 0;
				starttiming.activetimeclock.spid[restswimid][2] = 0;
				starttiming.activetimeclock.sparray[restswimid] = [];
				
		
				$splivereset = $('#splits'+restswimid);
				$splivereset.empty();
				$splivereset.append("<li></li>");
				$diffreset = $('#analysis'+restswimid);
				$diffreset.empty();
				$diffreset.append("<li></li>");

		});
		// and this needs move to per swimmer basis
		this.t[7] = 0;

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
		
		this.delaymaster = starttiming.activetimeclock.startclock.t;
		
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
		
// need to identify active swimmers from UI
			// what order did the swimmers go off 
		this.activeswimmers = [];
		var noswimmerlive = $("a#stop").length;
	

		var listactives = [];

		var listactives = $('#sortable1').sortable('toArray');

		countswimmers = listactives.length;
	
		this.activeswimmers = listactives;

		
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
		

			this.display();
		}
		else {

			this.$start.text(this.stopText);
						
			this.t[4] =  setInterval(this.displaymaster, 43);
	
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
			this.spdiffarray = {};
			}
			
// if an individual swimmer id array has not been set set it
		if(!this.spid[this.splitidlive]){			
//console.log('should be only first time set of this');			
		this.spid[this.splitidlive] =  [1,0,0];
		this.sparray[this.splitidlive] =  [];
		this.spdiffarray[this.splitidlive] = [];	
		
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
//console.log('what t arrays are set start after resetbutton pressed?');
	// form stop location div
			

			this.t =  this.startclock.t;

			
			this.t[this.t[2]] = (+new Date()).valueOf();

	// need to make this stop logic local to this swimmer
			this.spid[stoploc][0] = 1 - this.spid[this.splitidlive][0];
			
				if (this.spid[stoploc][0] == 0) {
	
					
					liveHTML.realtimestop(this, stoploc);
	/*				
	// make the total time elasped in ms local to this swimerid
				// what order did this swimmer go off?
				swimpos = this.startclock.activeswimmers.indexOf(stoploc);
	
				// order position times interval time period
				stoplag = swimpos * (this.startclock.swiminterval * 1000);
		
				stoptimelive = this.t[1] - this.t[0] - stoplag;
					
				this.spid[this.splitidlive][1] = stoptimelive;
				this.sparray[this.splitidlive].push(this.spid[this.splitidlive][1]);	
							
				(this.startclock.$start).text(this.startclock.startText);
				
	// make this stop/split id local to this swimmer				
				this.spid[this.splitidlive][2]++;
	//console.log('t2 not equal to zero in stop');
				$($splitslive).show();
				$('<li><span>' + this.startclock.zero(this.spid[this.splitidlive][2]) + '</span> ' + this.startclock.format(this.spid[this.splitidlive][1]) + '</li>').appendTo($($splitslive)).slideDown('fast');
				$($splitslive).find('li').removeClass('first last');
				$($splitslive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				
				this.t[1] = 0;
				this.stoppedlist.push(stoploc);
				this.startclock.display();
*/
				}

		if(this.stoppedlist.length == (this.startclock.activeswimmers.length)){
		// stop the main stopwatch
//console.log('all watches have been stopped');		
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
//console.log('split clicked');	
	// contorl logic, has the main timer been started? If yes proceed if not do nothing.		
	if(this.startclock.t[1] == 0) {
		// nothing start do nothing.
	}
	else
	{	
		
		this.t =  this.startclock.t;	
//console.log(this.t);
		
	// need array to hold each swimmer id along with their times/splits info.
		this.t[2] = 1;		
			if (this.t[2] !== 0) {
				this.spid[spidin][2]++;
console.log(this);				
				liveHTML.realtimesplitsdiff(this, spidin);
/*							
				// what order did this swimmer go off?
				swimpos = this.startclock.activeswimmers.indexOf(spidin);
		
				// order position times interval time period
				splitlag = swimpos * (this.startclock.swiminterval * 1000);
		
				splittimelive = this.t[3] + this.t[1] - this.t[0] - splitlag;
				
				this.spid[this.splitidlive][1] = splittimelive;
				
				lastsplitpers = this.sparray[this.splitidlive].slice(-1)[0];
				if(lastsplitpers == undefined)
				{
	console.log('if bein called');				
					lastsplitpers = splittimelive;
				}
console.log('previous split time');				
console.log(lastsplitpers);
				
				this.sparray[this.splitidlive].push(this.spid[this.splitidlive][1]);
				// display splits
				$($splive).show();
				$('<li><span>' + this.startclock.zero(this.spid[spidin][2]) + '</span> ' + this.startclock.format(splittimelive) + '</li>').appendTo($($splive)).slideDown('fast');
				$($splive).find('li').removeClass('first last');
				$($splive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				// perform analysis & display

				lastsplitper = this.sparray[this.splitidlive].slice(-1)[0];
console.log('current split time');				
console.log(lastsplitper);				


					lastdifftocompare = this.spdiffarray[this.splitidlive].slice(-1)[0];
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
				this.spdiffarray[this.splitidlive].push(thedifflive);
				if(thedifflive > lastdifftocompare ) {
						thecolourdiff = 'red'; }
				else {
						thecolourdiff = 'green'; }
					
					$($analysislive).show();
					$('<li><span>' + this.startclock.zero(this.spid[spidin][2]) + '</span> ' + this.startclock.format(thedifflive) + '</li>').appendTo($($analysislive)).slideDown('fast');
					$($analysislive).find('li').removeClass('first last');
					$($analysislive).find('li:first').addClass('first').end().find('li:last').addClass('last');
					//.css("color", thecolourdiff)
*/			}
			
			return false;
	
		}
		
	}

	
}; // closes Per Swimmer


/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){
//console.log('start new timer object');	

	$(window).unload( function () { 
	
			passwordin = '';
			$("#loadlaneselect").hide();
			$("#loadswimmers").hide();
			$("#syncdata").hide();
			$("#clearpouchdb").hide();
			$("#sortable1").empty();
			$("#signinopener").show();
	
				// need to tell the server of the log out too
			$.get("/signout/" + $.cookie("traintimer"), function(resultout){
						});
			$.cookie("traintimer", null);
      alert("You haved signed out of TrainTimer");

		});
	
	$("#loadlaneselect").hide();
	$("#loadswimmers").hide();
	$("#loadclearswimmers").hide();
	$(".swimsettings").hide();
	$("#syncdata").hide();
	$("#clearpouchdb").hide();
	//fire up the classes
	starttiming = new SwimtimeController();
	livepouch = new pouchdbSettings;	
	liveHTML = new ttHTML;	
	var today = new Date();

	$("#swimdate").text(today);
	$("#siginform").hide();
		
	$("#signinopener").click(function(e) {
//console.log('time to distroy the cookie please');
		usernamein = '';
		passwordin = '';
		cookieidhash = '';
		passwordhash= '';
	// sigin modal
	loginhtml = '';
	loginhtml += '<div>Welcome, to Train Timer </div>';
	loginhtml += '<form method="post" action="#" id="siginform" >';
	loginhtml += '<div><label for="name">Username</label><input id="name" class="text ui-widget-content ui-corner-all" type="text" name="name" size="16" ></div>';
	loginhtml += '<div><label for="password">Password</label><input id="password" class="text ui-widget-content ui-corner-all" type="password" value="" name="password" size="16" ></div></form>';
	loginhtml += '<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"> <div class="ui-dialog-buttonset"><button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false"><span class="ui-button-text">Sign me in</span></button></div></div><div id="responsemessage"></div>';

	$("#siginform").dialog({
			autoOpen: false,
			height: 340,
			width: 260, 
			title: 'Signin to Train Timer',
			buttons: {
										"Sign me in": function() {
											// need to make couchdb call to accept user details
										usernamein = $("#name").val();
										passwordin = $("#password").val();											

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
										cookieidhash = hashCode((usernamein + passwordin));									
											
										this.acceptdetails = '';
		
										//$.get("/signin/", function(resultback){
										$.get("/signin/" + usernamein + '/' + cookieidhash + '/' + passwordhash, function(resultback){
										// put a message back to UI to tell of a successful save TODO
											this.acceptdetails = resultback;
							
												if(this.acceptdetails['signin'] == 'passed') {		
												//passedsigntest("one");
												$.cookie("traintimer", cookieidhash,  { expires: 7 });
												$("#ifsignedin").show();	
												$("#ifsignedin").html('<a class="menu-text" text="SignOut" title="signout" href="#"  id="signincloser" >Sign-out</a> ' + usernamein );
												$("#siginform").dialog( "close" );
												$("#signinopener").hide();
												$("#sortable1").empty();
												$("#syncdata").show();
												$("#clearpouchdb").show();
										
																				
												}
												else {
//console.log('failed');
													$("#responsemessage").html('Signin Failed, try again');
												}
											});	
															
										},

										Cancel: function() {
										$( this ).dialog( "close" );
										},

			},
			close: function() {
			$("#name").val( "" );
			$("#password").val( "" );
			cookieidhash = '';
			passwordhash= '';
				
			},

		});
	$("#siginform").show();
	$("#siginform").dialog('open');

		// prevent the default action, e.g., following a link
		return false;

	});

	
		/*
	* Clear pouchDB
	*
	*/
	$("#clearpouchdb").click(function(e) {
		
		livepouch.deletePouch();
		
	});
	
	/*
	* Sync data back to couchdb online
	*
	*/
	$("#syncdata").click(function(e) {
		
		designdoc = 0;
		// need to set a design document (but only needed once)
		if(designdoc != 1 ) {
			
			designdocjson = {"_id": "_design/swimmers",  "filters" : {"justname" : "function(traintimer) {if(traintimer.name == '_design/swimmers' ) { emit (traintimer.changes, traintimer.changes)} }" }};
	livepouch.putDoc(designdocjson);
		}
		// get all current doc from pouchdb and pass them on to nodejs to couchdb and delete local data (ideally leave 1 month or user directed future todo )
//console.log('list to sync');	
		//
		localsplitstodelete = [];
		
		function localDatalog(callback) {  
			livepouch.filterchangeLog(callback);
			//livepouch.mapQueryname(selectedlanenow, callback);
			
		}  

		localDatalog( function(trainlog) {

				trainlog['results'].forEach(function(rowsswimsplit){
		
					if (rowsswimsplit.doc['session'] && (rowsswimsplit.deleted != 1))
					{
						// form JSON to sync back to couch
						buildsyncsplits = {};
						buildsyncsplits['session'] = rowsswimsplit.doc['session'];
						buildsyncsplits['swimmerid'] =rowsswimsplit.doc['swimmerid'];
						syncdataforsave =  JSON.stringify(buildsyncsplits);
						$.post("/sync/", syncdataforsave ,function(result){
					// put a message back to UI to tell of a successful sync
						livepouch.deleteDoc(rowsswimsplit.doc['_id']);	
			
						});
					}
				});
			
	
		/*
		// same for swimmer names expect do not del but mark last seq no. 
		trainlog['results'].forEach(function(rowsswimname){
					
					if (rowsswimname.doc['name'] )
					{
console.log('new names back to couch');						
console.log(rowsswimname);
						// form JSON to sync back to couch
						buildsyncswimmer = {};
						buildsyncswimmer['lanetrain'] = rowsswimname.doc['lanetrain'];
						buildsyncswimmer['name'] = rowsswimname.doc['name'];
						buildsyncswimmer['swimmerid'] = rowsswimname.doc['swimmerid'];
							syncdataforsave =  JSON.stringify(buildsyncswimmer);
				$.post("/sync/", syncdataforsave ,function(result){
					// put a message back to UI to tell of a successful sync
console.log('callback from sync to couchdb via node is complete');	
			
				});
					}
				});
		*/
		});
});

	$("#ifsignedin").click(function(e) {
//console.log('time to distroy the cookie please');
			e.preventDefault(e);
			var $sotgt = $(e.target);
//console.log('what tgt look like?');			
        if ($sotgt.is("#signincloser")) {
					
					//starttiming = '';
					//starttiming.activetimeclock = '';

					$("#ifsignedin").fadeOut("slow");
						//$("#ifsignedin").hide();	
					$("#loadlaneselect").hide();
					$("#syncdata").hide();
					$("#clearpouchdb").hide();
					$("#sortable1").empty();
					$("#signinopener").show();
	
					// need to tell the server of the log out too
						$.get("/signout/" + $.cookie("traintimer"), function(resultout){
							
						});
					$.cookie("traintimer", null);

				}
					
	});
		
/*
* add swimmer form produced after default layout therefore need to delegate to existing DOM element	
*/	
	$("#newmaster").click(function (e) {
				
					e.preventDefault(e);
					// has the user signed in?
					setsaveallowed = '';
					setsaveallowed = $.cookie("traintimer");
//console.log('has cookie been set?' + setsaveallowed);		
				
				 var $tgt = $(e.target);
//console.log('what tgt look like?');
//console.log($tgt.attr("name"));				
        if ($tgt.is("#newmasteradd")) {
					
					// need to be both a name and a lane number validation
					newmastnameis = $("#newmasteradd input#newmastid ").val();
					newlane = $("#thelaneoptionsnew").val();
//console.log('what are we validatig on' + newmastnameis + 'lane' + newlane );					
					if(newmastnameis.length > 0 && (newlane.length > 0 && newlane != -1) )
					{
console.log('form validation passed');
					//newmastidis = $("#newmasteradd input#newmidid ").val();
												hashCode = function(str){
												var hash = 0;
												if (str.length == 0) return hash;
												for (i = 0; i < str.length; i++) {
														char = str.charCodeAt(i);
														hash = ((hash<<5)-hash)+char;
														hash = hash & hash; // Convert to 32bit integer
												}
//console.log(hash + 'new hasnumber');
												return hash;
												}
												var newidnumberstart = new Date();
												newswimmerguid = Date.parse(newidnumberstart);
//console.log('date string' + newswimmerguid)	;									
						newmastidish = hashCode(newmastnameis);
						newmastidisrand = Math.floor((Math.random()*10000000)+1);
//console.log(newmastidisrand + 'randon number');												
						newmastidis = newmastidisrand + '-' + newmastidish;												
//console.log('new GUID' + newmastidis);				
					
// need to save new master to couch, name and masters id,  validate unique ID number
					firstsavenewmaster = {};
					firstsavenewmaster['name'] = newmastnameis;
					firstsavenewmaster['swimmerid'] = newmastidis;
					firstsavenewmaster['lanetrain'] = newlane;
					jsonfirstsavenewmaster =  JSON.stringify(firstsavenewmaster);

						//  make save to poudbfirst
						livepouch.singleSave(firstsavenewmaster);
						
						//$.post("/save/" + setsaveallowed, jsonfirstsavenewmaster ,function(result){
							// put a message back to UI to tell of a successful save TODO
						//	});					
				
				$("#newmaster").hide();
// add html code for new swimmer added
					newswimcode = '';		
					newswimcode = liveHTML.fromswimmers(newmastnameis, newmastidis);			
							
				$("#sortable1").append(newswimcode);
				$("#saveconfirmswimmer").text('new master added');
				$("#saveconfirmswimmer").show();
				$("#saveconfirmswimmer").fadeOut("slow");
				$("#addswimmer").attr("name", "on");

				}
				else
				{
					// need to prompt to add name or select lane number
					adderrormessage = 'Please ';
					if(newmastnameis.length == 0 )
					{ 
						adderrormessage += 'add a name ';
					}
					if(newlane == -1 )
					{
							adderrormessage += 'select a lane ';
					}
					$("#newswimerror").html(adderrormessage);
				}
			}
			
	});
		
			$("#thelaneoptions").change(function () {
	//livepouch.deletePouch();
				$("#viewdatalive").empty();
				$("#visualisedata").empty();
				$("#splittimeshistorical").empty();
				$("#loadlane").attr("name", "on");
				selectedlanenow = $("#thelaneoptions").val();
console.log('yes lane' + selectedlanenow );
				//first check local
					function localDatacall(selectedlanenow, callback) {  
						livepouch.mapQueryname(selectedlanenow, callback);
					}  
      
					localDatacall(selectedlanenow, function(rtmap) {  

						presentswimmer = '';
								
					rtmap["rows"].forEach(function(rowswimrs){

							if(rowswimrs['key'] == selectedlanenow )
							{
								//pass the lane data to get html ready
								presentswimmer += liveHTML.fromswimmers(rowswimrs['value'][1], rowswimrs['value'][0]);
							
								}
						});

				$("#sortable1").html(presentswimmer);	

	// test splits data recall						
	function localDataSPcall(dataspin, callback) {  
						livepouch.mapQuerySplits(dataspin, callback);

					}  
      
					localDataSPcall('1', function(spmap) {  
//console.log('how splits data look after save');
//console.log(spmap);						
						});						
						

    });  
							
				// make post request to get swimmer for this lane and dispaly
				//$("#sortable1").load("/buildswimmers/lane/" + selectedlanenow + '/' + setsaveallowed);
				$("#loadlaneselect").hide();
				$("#loadswimmers").hide();
				$("#loadclearswimmers").hide();
			});	
			
/*
*
* List swimmer alphabetically
*/
	$("#theswimmeroptions").change(function () {

				$("#viewdatalive").empty();
				$("#visualisedata").empty();
				$("#splittimeshistorical").empty();
				$("#loadlane").attr("name", "on");
				selectedswimmernow = $("#theswimmeroptions").val();
console.log('letter in ' + selectedswimmernow );
				//first check local
					function localDatacall(selectedswimmernow, callback) {  
						livepouch.mapQueryname(selectedswimmernow, callback);
					}  
      
					localDatacall(selectedswimmernow, function(rtmap) {  

						presentswimmer = '';
						presentswimmer = '<form id="alphaswimmeradd" class="menu-text" action="#" method="post">';
//console.log(rtmap);								
					rtmap["rows"].forEach(function(rowswimrs){
						getfirstletter = rowswimrs['value'][1].charAt(0);
						makelettersmall = getfirstletter.toLowerCase();
						
							if(makelettersmall == selectedswimmernow )
							{
								// prepare list box  select and append HTML
								presentswimmer += liveHTML.checkboxswimmers(rowswimrs['value'][1], rowswimrs['value'][0]);
								//pass the lane data to get html ready
								//presentswimmer += liveHTML.fromswimmers(rowswimrs['value'][1], rowswimrs['value'][0]);
							
								}
								
					});
				presentswimmer += '</form>';
					//presentswimmer += '<a href="" id="aaselectswimmer" >add alpha</a>';
					
				$("#addalpha").html(presentswimmer);					
				
					presentclose = '<a href="" id="closealphalist" class="control-text" >Close</a>';
					$("#addalphatwo").html(presentclose);

    });  
							
				// make post request to get swimmer for this lane and dispaly
				//$("#sortable1").load("/buildswimmers/lane/" + selectedlanenow + '/' + setsaveallowed);
				$("#loadlaneselect").hide();
				$("#loadswimmers").hide();
				$("#loadclearswimmers").hide();
			});	

/*
*
* Add swimmer to active live list
*/
	$("#addalpha").change(function (e) {
		
			var $tgt = $(e.target);
console.log('what tgt look like?');
console.log($tgt.is);	
console.log($tgt.attr("value"));	
		// which name checked?
		swimnamealpha = $tgt.attr("value");
		swimidalpha = $tgt.attr("id");
		// prepare list box  select and append HTML
		presentswimmeralpha = liveHTML.fromswimmers(swimnamealpha, swimidalpha);
		$("#sortable1").append(presentswimmeralpha);
		
		
	});
			
/*
* Close alphalist
*/
	$("#addalphatwo").click(function (e) {
		e.preventDefault(e);
		$("#addalpha").empty();
		$("#addalphatwo").empty();
		
	});

/*
* Clear all swimmer from sort div
*/
	$("#clearallswimmers").click(function (e) {
		e.preventDefault(e);
console.log('clearswimmer click call');		

			$("#sortable1").empty();
			$("#loadlaneselect").hide();
			$("#loadswimmers").hide();
			$("#loadclearswimmers").hide();
			$("#loadlane").attr("name", "on");

	});	
	
/*
* delgation of add alpha swimmer
*/
	$("#aselectswimmer").click(function (e) {
		e.preventDefault(e);
console.log('alpha add start');			
			var $tgt = $(e.target);
//console.log('what tgt look like?');
//console.log($tgt.attr("name"));				
			if ($tgt.is("#aselectswimmer")) {
				aselectswimmerlist = $(".demo input#aselectswimmer ").val();			
console.log('alpha add swimmers');
console.log(aselectswimmerlist);
				}
	});					

// drag and drop
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
			
// need to identify which swimmers css markup has been clicked
	$("a").click(function(e){
			e.preventDefault(e);
			var resultord = $('#sortable1').sortable('toArray');
			idclick = $(this).attr("id");
			idname = $(this).attr("name");	
			// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idname, idclick);
		
	});	

	
	$("#sortable1").on("click", function (e) {
  //  $("a").click(function(e){
	   e.preventDefault(e);
		 var $swtgt = $(e.target);
		 if ($swtgt.is("a")) {
			idclick = $swtgt.attr("id");
			idname =$swtgt.attr("name");	
			// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idname, idclick);
		 }
	});
	
	$("#viewdatalive").change(function (ec) {
		
		ec.preventDefault(ec);
		$("#sortable1").empty();
		var $chdiv = $(ec.target);
		changefrom = $chdiv.attr("id");
		changefromvalue = $chdiv.attr("value");
//console.log($chdiv);
//console.log(changefrom);
		if(changefrom == "theswimmerview")
		{
			$("#visualisedata").empty();
			$('#splittimeshistorical').empty();
			// 1 get the data, 2 pass on the HTML class
			datacall = livepouch.returndatacallback(changefromvalue);
//console.log('databacl when?' + datacall);			
			
		}
		
	});
	
//console.log('start whole app');		
console.log(starttiming);	
});