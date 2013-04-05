/*
* check the homepage index.html webpage has been displayed
*/
var baseUrl = "http://localhost:8836/";

casper.test.comment("Scenario: A user can view the home page");

casper.start(baseUrl, function() {
	this.test.comment('when homepage loaded check its title');
  this.test.assertHttpStatus(200, "Response is a success if 200 else a fail");
  this.test.assertTitle("Train Timer - an open sport project", "Title is as expected or else fail");
});

casper.run(function() {
    this.test.done(); // I must be called once all the async stuff has been executed

});