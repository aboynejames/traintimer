/**
* swimmers active area div placement, need to set context by adding a swimmer TODO
*/
var utils = require('utils');
var baseUrl = "http://localhost:8835";

casper.test.comment("Add a new swimmer and then test they are loaded back again after a clear");
casper.start(baseUrl, function() {

	
});

	
// Click on swimmer button
casper.then(function() {
	this.test.comment('click on swimmers button');

			this.mouseEvent('click', '#loadlane');	
			this.mouseEvent('click', '#addswimmer');	

});

casper.then(function() {
	this.test.comment('see that new swimmer submit button is present');	
	casper.test.assertExists('#newmasteradd', 'the element exists');
	casper.test.assertExists('#newswimerror', 'the element exists');
	//this.debugHTML();
});

casper.wait(2000, function() {
    this.echo("I've waited for a second.");
});

// now fill in the form
casper.then(function() {		
	
    this.fill('form#newmasteradd', { newmastid: "aboynejames" }, false);

		this.echo('before new swimmer add form');
		this.echo(this.getFormValues('form#newmasteradd').newmastid); // 'aboynejames'
		this.test.assert("aboynejames" === this.getFormValues('form#newmasteradd').newmastid, 'the value as expected');
		
});

// selec the drop down lane/group
casper.then(function() {
	
this.evaluate(function() {

		var $select = $('select#thelaneoptionsnew');
    var _option = "1";
    $select.val(_option);
    //$select.change();
		
		//return document;

	});	
});

casper.then(function() {
	this.test.comment('submit the new swimmer form button');

		this.mouseEvent('click', '#newmasteradd');	
		//this.debugHTML();	
});

/*
casper.then(function() {
	this.test.comment('check for new swimmer error message');
	casper.test.assertExists('#newswimerror', 'the element exists');
	
	this.test.assert("Please add a name select a lane " === this.fetchText('#newswimerror'), 'the value as expected');
	
	
});
*/

casper.then(function() {
	this.test.comment('new swimmer added with both form fields filled in   ');
	casper.test.assertExists('#pername', 'the element exists');
	
	this.test.assert("aboynejames" === this.fetchText('#pername'), 'the value as expected');
	
});


// need to clear the loaded swimmer and re load then
casper.then(function() {
	this.test.comment('submit the new swimmer form button');

		this.mouseEvent('click', '#clearallswimmers');	
		this.mouseEvent('click', '#loadlane');	

//	this.debugHTML();
});

casper.then(function() {
	this.test.comment('no active swimmers, this should be clear of data now');
	//this.test.assert("aboynejames" != this.fetchText('#'), 'the value as expected');
	this.test.assertDoesntExist('#pername', 'the div is not present');
});


casper.then(function() {
	this.test.comment('make sure the divs are ready to be pressed again');	
	casper.test.assertExists('#loadlaneselect', 'the element exists');
	casper.test.assertExists('select#thelaneoptions', 'the element exists');
	//this.debugHTML();
});

casper.then(function() {	
		
	var js = this.evaluate(function() {

		var $select = $('select#thelaneoptions');
    var _option = "1";
    $select.val(_option);
    $select.change();
		
		return document;

	});	

		//this.echo(js.all[0].outerHTML);

});



casper.then(function() {	
this.test.comment('create a mock HTML to add back to UI');
	var jss = this.evaluate(function() {

		var mockswimmerhtml = liveHTML.fromswimmers('aboynejames', 1);		
		$("#sortable1").html( mockswimmerhtml);				
		
		return document;

	});	

		//this.echo(jss.all[0].outerHTML);

});

casper.then(function() {
	this.test.comment('check lane1 swimmer is added');
	
	this.test.assert("aboynejames" === this.fetchText('#pername'), 'the value as expected');
//this.debugHTML();		
});


casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});