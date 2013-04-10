/**
* swimmers active area div placement, need to set context by adding a swimmer TODO
*/
var baseUrl = "http://localhost:8842";

casper.test.comment("Add a new swimmer");

casper.start(baseUrl, function() {
	
});

// now click on signup form link and then try to fill in the form
// Click on swimmer button
casper.then(function() {
	this.test.comment('click on swimmers button');
	
		 //this.mouseEvent('click', '#loadlane');	
			this.mouseEvent('click', '#signupstart');	

		
});

casper.then(function() {
	this.test.comment('press the signup button');
	casper.test.assertExists('#signupspace', 'the element exists');
	
	
	
});

// submi the  signup form 

casper.then(function() {
	this.test.comment('submit signup form button');
	
		 //this.mouseEvent('click', '#loadlane');	
			this.mouseEvent('click', '#contactin');	

		
});

casper.then(function() {
	this.test.comment('error message should get');
//	casper.test.assertExists('#signupspace', 'the element exists');
		this.test.assert("Please enter  a Name  Email  Swim Club" === this.fetchText('#formfeedback'), 'the value as expected');
	
	
});



casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
	//this.debugHTML();
  this.test.done();
	//this.exit(); 
});