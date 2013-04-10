/**
* Test the edit button to allow moving of swimmers order
*/
var baseUrl = "http://localhost:8842";

casper.test.comment("Test the edit button and ability to move swimmers");

casper.start(baseUrl, function() {
	this.test.comment('first click on edit button ');
	this.mouseEvent('click', '#startsort');
	//casper.test.assertExists('', 'the element exists');
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});