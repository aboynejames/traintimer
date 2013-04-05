/**
* Analysis summary statistics layout checks
*/
var baseUrl = "http://localhost:8836";

casper.test.comment("View summary analaysis");

casper.start(baseUrl, function() {
	this.test.comment('first click on analysis button ');
	this.mouseEvent('click', '#viewdata');
	
});

casper.then(function() {	
this.test.comment('check analysis title changed to off');
	this.analysisstatus = this.getElementAttribute('#viewdata', 'title');
//this.echo(this.analysisstatus);
	this.test.assert("off" === this.analysisstatus, 'the value as expected');
	
});	

casper.then(function() {	
this.test.comment('create a mock HTML including historial data');
	var jss = this.evaluate(function() {

		var mockswimmerhtml = liveHTML.fromswimmers('aboynejames', "3865253--554494698");		
		$("#sortable1").html( mockswimmerhtml);				
		//	$(".peranalysisid3865253--554494698").attr("title", "off");

		
//		return document;

	});	
//this.debugHTML();
		//this.echo(jss.all[0].outerHTML);

});

casper.then(function() {
	this.test.comment('check lane1 swimmer is added');
	
	this.test.assert("aboynejames" === this.fetchText('#pername'), 'the value as expected');
//this.debugHTML();		
});




casper.then(function() {	
this.test.comment('create a mock summary analysis data');
	
	this.mouseEvent('click', '#persummaryid');	

	var jss = this.evaluate(function() {

		livepouch = {"1":"1"};
		swimidin = '3865253--554494698';
		ahistoricalswimdata = {};
		ahistoricalswimdata['sessionid'] = 1364553195000;
		ahistoricalswimdata['splittimes'] = [1074, 2399];	
		ahistoricalswimdata['swiminfo'] = {"swimdate":"2013-03-29T10:33:15.109Z", "swimdistance":"100", "swimsplit":"50", "swimstroke":"freestyle", "swimstyle":"training", "swimtechnique":"swim"};
			
		historicalswimdata = {}
		historicalswimdata['1364553195000'] = ahistoricalswimdata;
			
		liveHTML.summaryme(livepouch, swimidin, historicalswimdata);

		return document;

	});	

		//this.echo(jss.all[0].outerHTML);
//this.debugHTML("#sortable1");		
});

casper.then(function() {
	this.test.comment('press the summary statistics button test title changes to off');
//html body div.container div.demo ul#sortable1.droptrue li#3865253--554494698.ui-state-default div.peranalysis a#peranalysisid.peranalysisid3865253--554494698
	
	this.summarystatus = this.getElementAttribute('#persummaryid', 'data-statusanalysis');
//this.echo(this.nowstatus);	
	this.test.assert("off" === this.summarystatus, 'the value as expected');
	this.test.assert("on" === this.getElementAttribute('#perchartid', 'data-statusanalysis'), 'the value as expected');
	this.test.assert("on" === this.getElementAttribute('#peranalysisid', 'data-statusanalysis'), 'the value as expected');
	this.test.assert("on" === this.getElementAttribute('#perbioid', 'data-statusanalysis'), 'the value as expected');	
//this.debugHTML();	
	
});

casper.then(function() {
	this.test.comment('the summary stat section exist');
//html body div.container div.demo ul#sortable1.droptrue li#3865253--554494698.ui-state-default div#historicalsummary3865253--554494698
	casper.test.assertExists('.historicalsummary div.trainingstats', 'the element exists');
	casper.test.assertExists('div.seasonbeststats', 'the element exists');
	casper.test.assertExists('div.personalbeststats', 'the element exists');
//this.debugHTML();	
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});