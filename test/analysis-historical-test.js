/**
* Analysis historial campare splits/times layout checks
*/
var baseUrl = "http://localhost:8836";

casper.test.comment("View analysis historical times/splites compare data section");

casper.start(baseUrl, function() {
	this.test.comment('first click on analysis button ');
	this.mouseEvent('click', '#viewdata');
	
});

casper.then(function() {	
this.test.comment('check analysis title changed to off');
	this.analysisstatus = this.getElementAttribute('#viewdata', 'title');
this.echo(this.analysisstatus);
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
this.test.comment('create a mock historial data');
	
	this.mouseEvent('click', '#peranalysisid');	

	var jss = this.evaluate(function() {

		livepouch = {"1":"1"};
		swimidin = '3865253--554494698';
		ahistoricalswimdata = {};
		ahistoricalswimdata['sessionid'] = 1364553195000;
		ahistoricalswimdata['splittimes'] = [1074, 2399];	
		ahistoricalswimdata['swiminfo'] = {"swimdate":"2013-03-29T10:33:15.109Z", "swimdistance":"100", "swimsplit":"50", "swimstroke":"freestyle", "swimstyle":"training", "swimtechnique":"swim"};
			
		historicalswimdata = {}
		historicalswimdata['1364553195000'] = ahistoricalswimdata;
			
		liveHTML.visualiseme(livepouch, swimidin, historicalswimdata);
		//$(".peranalysisid3865253--554494698").attr("data-statusanalysis", "off");
				//$("#splittimeshistoricalsessionid3865253--554494698.splitview").html('Date:2013-03-29T13:35:54.659Z freestyle swim training 100 50 <br><li style="color: green;">00:04.34 split 0:00.84</li><li style="color: red;">00:03.49 split 0:03.49</li></div>');

		
		return document;

	});	

		//this.echo(jss.all[0].outerHTML);
//this.debugHTML("#sortable1");		
});

casper.then(function() {
	this.test.comment('press the Now button test title changes to off');
//html body div.container div.demo ul#sortable1.droptrue li#3865253--554494698.ui-state-default div.peranalysis a#peranalysisid.peranalysisid3865253--554494698
	
	this.nowstatus = this.getElementAttribute('#peranalysisid', 'data-statusanalysis');
this.echo(this.nowstatus);	
	this.test.assert("off" === this.nowstatus, 'the value as expected');
	this.test.assert("on" === this.getElementAttribute('#perchartid', 'data-statusanalysis'), 'the value as expected');
	this.test.assert("on" === this.getElementAttribute('#persummaryid', 'data-statusanalysis'), 'the value as expected');
	this.test.assert("on" === this.getElementAttribute('#perbioid', 'data-statusanalysis'), 'the value as expected');
	
//this.debugHTML();	
	
});

casper.then(function() {
	this.test.comment('the historical swim data should be attached to div historical analysis');
	
	casper.test.assertExists('.splitviewcompare', 'the element exists');
	casper.test.assertExists('.splitviewrep', 'the element exists');
	casper.test.assertExists('.splitview', 'the element exists');
//this.debugHTML();	
	
});

casper.then(function() {
	this.test.comment('for 100m ensure 2 split times');
	
	this.test.assertEval(function() {
        return document.querySelectorAll('#splittimeshistorical13645531950003865253--554494698.splitview li').length == 2;
    }, 'two splits times are displayed');
	
	
});


casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});