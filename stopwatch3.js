// one universal start and reset button
var $start      = $('#start'),
       $reset      = $('#reset'),
       $timer      = $('#timer'),
       startText   = $start.text(),
	stopText    = $start.attr('alternate'),
	$splits    = $('#splits'),

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
	t = [0, 0, 0, 0, 0, 0, 0, 0];


	format = function(ms) {
		var d = new Date(ms + t[5]).toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
		var x = String(ms % 1000);
//console.log('formatting x ');
//console.log(x);
		while (x.length < 3) {
			x = '0' + x;
		}
		d += '.' + x;
		return d.substr(0, d.length - 1);
	},
	
	zero = function(num) {
		if (parseInt(num) < 0) var neg = true;
		if (Math.abs(parseInt(num)) < 10) {
			num = '0' + Math.abs(num);
		}
		if (neg) num = '-' + num;
		return num;
	},
	
	startStop = function() {
		t[t[2]] = (+new Date()).valueOf();
console.log(t[t[2]]);
console.log(t);
console.log('assoon as start pressed or stopped to end');		
		t[2] = 1 - t[2];
console.log(t);
		if (t[2] == 0) {
			clearInterval(t[4]);
			t[3] += t[1] - t[0];
			
			$start.text(startText);
			
			t[7]++;
console.log('t2 not equal to zero');
console.log(t);
			$splits.show();
			$('<li><span>' + zero(t[7]) + '</span> ' + format(t[3]) + '</li>').appendTo($splits).slideDown('fast');
			$splits.find('li').removeClass('first last');
			$splits.find('li:first').addClass('first').end().find('li:last').addClass('last');
			
			//t[4] = t[1] = t[0] = 0;
				
			display();
		}
		else {
console.log('else start');			
console.log(t);
			$start.text(stopText);
			t[4] = setInterval(display, 43);
		}
		
		return false;
	},
	
	stop = function(stoploc) {
		
// form stop location div
$splitslive = '#splits'+stoploc;
console.log($splitslive);
$stoplive = '#stop'+stoploc;
console.log($stoplive);
		
		
			t[t[2]] = (+new Date()).valueOf();
console.log(t[t[2]]);
console.log(t);
console.log('stop function called');		
		t[2] = 1 - t[2];
console.log(t);
		if (t[2] == 0) {
			clearInterval(t[4]);
			t[3] += t[1] - t[0];
			
			$start.text(startText);
			
			t[7]++;
console.log('t2 not equal to zero in stop');
console.log(t);
			$($splitslive).show();
			$('<li><span>' + zero(t[7]) + '</span> ' + format(t[3]) + '</li>').appendTo($($splitslive)).slideDown('fast');
			$($splitslive).find('li').removeClass('first last');
			$($splitslive).find('li:first').addClass('first').end().find('li:last').addClass('last');
			
			//t[4] = t[1] = t[0] = 0;
				
			display();
		}

	
		
		
	},

	reset = function() {
		if (t[2]) {
			startStop();
		}
		
		t[4] = t[3] = t[2] = t[1] = t[0] = 0;
		
		display();
		
		$start.text(startText);
		$splits.slideUp('fast', function() {
		$splits.empty();
		});
		
		t[7] = 0;
		
		return false;
	},
	
	display = function() {
		if (t[2]) {
//console.log('display function called and if t2');
			t[1] = (new Date()).valueOf();
		}
//console.log('display function set timer after formatting time.');		
		$timer.text(format(t[3] + t[1] - t[0]));
	},
	
	split = function(slocation) {
console.log('split clicked');			
console.log(t);
//form div id
$splive = '#'+slocation;
console.log($splive);		
		
		if (t[2] !== 0) {
			t[7]++;
			$($splive).show();
			$('<li><span>' + zero(t[7]) + '</span> ' + format(t[3] + t[1] - t[0]) + '</li>').appendTo($($splive)).slideDown('fast');
			$($splive).find('li').removeClass('first last');
			$($splive).find('li:first').addClass('first').end().find('li:last').addClass('last');
		}
		
		return false;
	},
	
	load = function() {
		t[5] = new Date(1970, 1, 1, 0, 0, 0, 0).valueOf();

		display();
	};

	
// jQuery listen for clicks and interaction	
$(document).ready(function(){

load();
	
// need to identify which swimmers css markup has been click
$("a").click(function(e){
console.log(this);        
  e.preventDefault(e);
   idclick = $(this).attr("id");
  idname = $(this).attr("name");
$("#hmtt").text(idname);

console.log(idclick);
console.log(idname);

switch(idclick){

    case "re": 
	reset();
    break;

	case "reset": 
	reset();
    break;

	case "start": 
	startStop();
    break;
    
	case "split":
	split('splits'+idname);
    break;

	case "stop":
	stop(idname);
    break;
	
  }
	
	

});



	



});