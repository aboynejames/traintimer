Swim Train timer
==========

Swim Train Timer  Instructions.
----------------------------------------------

Browser & Devices  (not fully tested)
----------------------------

Works on Firefox and Chrome Browsers only PC and tablet.   Android mobile with firefox beta browser.


Install
---------

Requirements:  Node.js  NPM  Couchdb (for online sync back)

1.  Download code from github
2.  On console type:   install npm   (installation directory)
3.  On console start node application file:    node index.js
4.  Go to "yourdomaindirectoryofinstall.com:8822    (port can be changed by editing the server.js file)

Non-Node.js install

1. Upload files to server
2. Got to url for sortexample5.html 


Usage
---------


1.  There is no need to log in at this stage, the site works locally to your computer or tablet.

2. Click  Add swimmer  link and enter a name and allocate a swimmer to a lane number.  Repeat as necessary.

3.  Set the swimming set e.g. the distance, stroke, splits etc with special notice given to the swim interval, swimmers leaving every 5 seconds apart.

4.  Load the lane of the swimmers you want to time.  Click Lane and select a number from the drop down list.  Swimmer can be order by clicking on the Reset order link and dragging and dropping.

5.  Start the stop watch, big green button.  Then if recording a  split press the split button next to each swimmers name as they turn and then on finish, press the stop button next to the swimmers name.

6.  Press Save to save the swim times

7.  Press Reset to  clear the stop watch back to 0 00 00

8.  Repeat or change swim set settings.

9.  View split times and analysis, Set the swim settings e.g. set the stroke, distance etc.   Load a lane of swimmers then click on the view data link.  Then select a swimmer from the drop down list of names.  Their times will be presented for that swim set, with the most recent appearing first,  times in red indicate a swimmers splits getting slower than the split before and green splits getting faster.

10.  Coming soon, syncing local data up to a club website for further analysis and charts over time.

Swim Train Timer is an [http://www.aboynejames.co.uk/wordpress/2012/09/08/open-sport-open-source-sport-project/](open sport project).

License
===========

Open source licence: <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>


Technology Used
===========
javascript
PouchDB <http://pouchdb.com/>
jQuery <http://jquery.com/>
HTML5
NodeJS <http://nodejs.org/>