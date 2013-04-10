/**
* Change the settings of set
*/
var baseUrl = "http://localhost:8842";
	var swimstyle;

casper.test.comment("Open the set settings link");

casper.start(baseUrl, function() {
	this.test.comment('first click on the edit set/race button ');
	this.mouseEvent('click', '#setshow');
	//casper.test.assertExists('', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('check edit title is now set to "off" ');	
	
	setstatus = this.getElementAttribute('#setshow', 'title');
	this.test.assertEquals("off", setstatus, 'status is the one expected');

});


casper.then(function() {
	this.test.comment('change from training to competition setting');	
	
this.evaluate(function() {

		var $select = $('select#swimstyle.rightselect option');
    var _option = "competition";
    $select.val(_option);
   
	});
	
});

casper.then(function() {
	this.test.comment('check the swimstyle has changed ');	

//	require('utils').dump(this.getElementInfo('select#swimstyle.rightselect option'));
	this.test.assertEquals("competition", this.getElementAttribute('select#swimstyle.rightselect option', 'value'), 'swimstyle is the one expected');
	
});

casper.then(function() {
	this.test.comment('change 5seconds to race 0 seconds');	
	
	this.evaluate(function() {
		var $select = $('select#swiminterval.rightselect option');
    var _option = "0";
    $select.val(_option);
   
	});	
});

casper.then(function() {
	this.test.comment('check the swimstyle has changed ');	
	this.test.assertEquals("0", this.getElementAttribute('select#swiminterval.rightselect option', 'value'), 'swiminterval is the one expected');
	
});

casper.then(function() {
	this.test.comment('change swimstroke from freestyle to butterfly ');	
	
	this.evaluate(function() {
		var $select = $('select#swimstroke.rightselect option');
    var _option = "butterfly";
    $select.val(_option);
   
	});	
});

casper.then(function() {
	this.test.comment('check the swimstyle has changed ');	
	this.test.assertEquals("butterfly", this.getElementAttribute('select#swimstroke.rightselect option', 'value'), 'swimstroke is the one expected');
	
});

casper.then(function() {
	this.test.comment('change swimtechnique from swim to kick ');	
	
	this.evaluate(function() {
		var $select = $('select#swimtechnique.rightselect option');
    var _option = "kick";
    $select.val(_option);
   
	});	
});

casper.then(function() {
	this.test.comment('check the swimtechnique has changed ');	
	this.test.assertEquals("kick", this.getElementAttribute('select#swimtechnique.rightselect option', 'value'), 'swimstroke is the one expected');
	
});

casper.then(function() {
	this.test.comment('change swimdistance from 100m to 800m ');	
	
	this.evaluate(function() {
		var $select = $('select#swimdistance.rightselect option');
    var _option = "800";
    $select.val(_option);
   
	});	
});

casper.then(function() {
	this.test.comment('check the swimdistance has changed ');	
	this.test.assertEquals("800", this.getElementAttribute('select#swimdistance.rightselect option', 'value'), 'swimstroke is the one expected');
	
});


casper.then(function() {
	this.test.comment('change swimsplit from 50m to 25m ');	
	
	this.evaluate(function() {
		var $select = $('select#swimsplit.rightselect option');
    var _option = "25";
    $select.val(_option);
   
	});	
});

casper.then(function() {
	this.test.comment('check the swimsplit has changed ');	
	this.test.assertEquals("25", this.getElementAttribute('select#swimsplit.rightselect option', 'value'), 'swimstroke is the one expected');
	
});



casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});