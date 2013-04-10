/**
* swimmers active area div placement, need to set context by adding a swimmer TODO
*/
var baseUrl = "http://localhost:8842";
var sp = '';

casper.test.comment("Add a new swimmer");

casper.start(baseUrl, function() {
	this.test.comment('start test of adding a new swimmer');
	
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

});

// now fill in the form
casper.then(function() {		
	
    this.fill('form#newmasteradd', { newmastid: "aboynejames" }, false);

//this.echo('before new swimmer add form');
//this.echo(this.getFormValues('form#newmasteradd').newmastid); // 'aboynejames'
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

casper.then(function() {
	this.test.comment('new swimmer added with both form fields filled in');
	casper.test.assertExists('#sortable1', 'the element exists');
	
	this.test.assert("aboynejames" === this.fetchText('#pername'), 'the value as expected');
	casper.test.assertExists('#perrealtime', 'the element exists');


	this.sp = this.getElementAttribute('#split', 'title');
//this.echo(this.sp);
//this.echo('afert attrib');
	
	this.test.comment('check perrealtime div is there but not visable');
	this.test.assertNotVisible('#perrealtime');
	
	this.test.comment('check peranalysis div is there but not visable');
	this.test.assertNotVisible('#peranalysis');

	this.test.comment('check peredit div is there but not visable');
	this.test.assertNotVisible('#peredit');

	this.test.comment('check historicalanalysis + id no div is there but not visable');
	this.test.assertNotVisible('#historicalanalysis' + sp);
	
	this.test.comment('check historicalchart + id no div is there but not visable');
	this.test.assertNotVisible('#historicalchart' + sp);	
	
	this.test.comment('check  historicalsummary + id no div is there but not visable');
	this.test.assertNotVisible('#historicalsummary' + sp);

	this.test.comment('check  historicalbio + id no div is there but not visable');
	this.test.assertNotVisible('#historicalbio' + sp);

});


/*
// if new swimmer add fields are not fill in test
casper.then(function() {
	this.test.comment('check for new swimmer error message');
	casper.test.assertExists('#newswimerror', 'the element exists');
	
	this.test.assert("Please add a name select a lane " === this.fetchText('#newswimerror'), 'the value as expected');
	
});
*/

// Click on swimmer button
casper.then(function() {
	this.test.comment('press the start button and then split button for swimmer loaded');
	
			this.mouseEvent('click', '#start');	
			
			this.wait(1000, function() {
//this.echo("I've waited for a second.");
			});
	
			this.mouseEvent('click', '.splitbutton' + this.sp);	
			
			this.wait(1000, function() {
//this.echo("I've waited for a second.");
			});
});

casper.then(function() {
	this.test.comment('check split and analysis div and time present');

	casper.test.assertExists('#splits' + this.sp, 'the element exists');
	
	this.stg1 = this.fetchText('#splits' + this.sp + '.splits li.last');
	sptime1 = this.stg1.length;
//this.echo(stg1);	
	casper.test.assertTruthy(sptime1 > 0 );
	//this.echo('split ==');
	//require('utils').dump(this.getElementInfo('#splits' + sp3 + '.splits li.last'));
	
	
	this.stg2 = this.fetchText('#analysis' + this.sp + '.analysis li.last');
	sptime2 = this.stg2.length;
//this.echo(stg2);	
	casper.test.assertExists('#analysis' + this.sp, 'the element exists');
	casper.test.assertTruthy(sptime2 > 0 );
	//	this.echo('analysis ==');
	//require('utils').dump(this.getElementInfo('#analysis' + sp3 + '.analysis li.last' ));

});

casper.then(function() {
	this.test.comment('press the split button');
	
			this.wait(1000, function() {
//this.echo("I've waited for a second.");
			});
	
			this.mouseEvent('click', '.splitbutton' + this.sp);	
			
});

casper.then(function() {
	this.test.comment('split button press and complete timing for 100m');

	casper.test.assertExists('#splits' + this.sp + '.splits li.last', 'the element exists');
	
	var stg3 = this.fetchText('#splits' + this.sp + '.splits li.last');
	sptime3 = stg3.length;
//this.echo(stg3);	
	casper.test.assertTruthy(stg3 > this.stg1 );
	//require('utils').dump(this.getElementInfo('#splits' + sp5));
	
	
	var stg4 = this.fetchText('#analysis' + this.sp);
	sptime4 = stg4.length;
//this.echo(stg2);	
	casper.test.assertExists('#analysis' + this.sp, 'the element exists');
	casper.test.assertTruthy(stg4 > this.stg2);
	//require('utils').dump(this.getElementInfo('#analysis' + sp5));

});

casper.then(function() {
	this.test.comment('press the reset button');
	
			this.wait(1000, function() {
//this.echo("I've waited for a second.");
			});
	
			this.mouseEvent('click', '#reset');	
			
});

casper.then(function() {
	this.test.comment('press the reset button to clear master and swimmer clocks');

	this.test.comment('check master clock is back to zero');
	this.test.assert("00:00:00.00" === this.fetchText('#timer'), 'the value as expected');

	this.test.comment('check individual swimmer time and splits are cleared');
	this.test.assertDoesntExist('#splits' + this.sp + '.splits li.last', 'per time timer cleared');
	this.test.assertDoesntExist('#analysis' + this.sp + '.analysis li.last', 'per splits timer cleared');

});

casper.run(function() {

  this.test.done();

});