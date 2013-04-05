/*
* check the homepage index.html webpage has been displayed
*/
var baseUrl = "http://localhost:8822";

casper.test.comment("Scenario: A base layout of the first html page sections");

casper.start(baseUrl, function() {
	this.test.comment('contrainer for whole page');
	casper.test.assertExists('.container', 'the element exists');

});

casper.then(function() {
	this.test.comment('master stopwatch area');
	casper.test.assertExists('#masterclock', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('active area of swimmers, analysis, etc');
	casper.test.assertExists('.demo', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('training/swim race settings');
	casper.test.assertExists('#setsettings', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('site signup  signin area');
	casper.test.assertExists('#swimadmin', 'the element exists');
	
});


casper.then(function() {
	this.test.comment('footer area');
	casper.test.assertExists('#footer', 'the element exists');
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});