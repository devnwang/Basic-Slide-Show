/**
The following JQuery commands have been used...
1. attr() -- sets the attributes of the JQuery element
2. css() -- sets the CSS of the JQuery element
3. append() -- inserts the content into the selected JQuery

These following commands have been used to create an object called SlideShow. SlideShow is able to create a background, which is a container, a slideShow panel to contain images, and a controlPanel with a left and right button, as well as a text box and and add and remove button to add and remove images. SlideShow also has the ability to create new images when .addNewPic() is called.
**/
var id = 1;
var picNum = 0;
function SlideShow (id) {
	this.id = "show" + id,
	this.imgCSS = [
	{position:'absolute', left:'10px', top:'10px', width:'76px', height:'87.25px', border:'1px solid green', opacity:'0.5', zIndex:'0'}, //0
	{position:'absolute', left:'48px', top:'53.625px', width:'152px', height:'174.5px', border:'1px solid green', opacity:'0.75', zIndex:'1'}, //1
	{position:'absolute', left:'124px', top:'140.875px', width:'304px', height:'349px', border:'1px solid green', opacity:'1', zIndex:'2'}, //2
	{position:'absolute', left:'438px', top:'140.875px', width:'304px', height:'349px', border:'1px solid green', opacity:'1', zIndex:'2'}, //3
	{position:'absolute', left:'752px', top:'140.875px', width:'304px', height:'349px', border:'1px solid green', opacity:'1', zIndex:'2'}, //4
	{position:'absolute', left:'980px', top:'53.625px', width:'152px', height:'174.5px', border:'1px solid green', opacity:'0.75', zIndex:'1'}, //5
	{position:'absolute', left:'1096px', top:'10px', width:'76px', height:'87.25px', border:'1px solid green', opacity:'0.5', zIndex:'0'}, //6
	{position:'absolute', left: '552px', top: '10px', width:'76px', height:'87.25px', opacity:'0', zIndex:'0'}], //7
	this.imgArr = [],
	//creates the green background box that contains the slideShow panel and controlPanel
	this.background = (function(divId) {
		var backgroundDiv = $('<div></div>')
			.attr({"class" : "backgroundDiv", "id" : "backgroundDiv"+divId})
			.css({
				"position": "absolute",
				"left": "20px",
				"top": "20px",
				"width": "1200px",
				"height": "600px",
				"background-color": "green"
			});
		return backgroundDiv;
	})(id),
	//creates the sky blue box that contains the images
	this.slideShowPanel = (function(divId) {
		var slideShowPanel = $('<div></div>')
			.attr({"class": "slideShowPanel", "id": "slideShowPanel"+divId})
			.css({
				"position": "absolute",
				"left": "10px",
				"top": "10px",
				"width": "1180px",
				"height": "500px",
				"background-color": "skyBlue"
			});
		return slideShowPanel;
	})(id),
	//creates a new img and assigns it a specific css
	this.addNewPic = function() {
		if (picNum < 8) {
			var pic = $('<img></img>')
				.attr({"class": "pos"+picNum, "src": "./Images/"+this.imgArr[picNum]})
				.css(this.imgCSS[picNum]);
			return pic;
		} else {
			this.imgCSS.push({position:'absolute', left: '552px', top: '10px', width:'76px', height:'87.25px', opacity:'0', zIndex:'0'});
			var pic = $('<img></img>')
				.attr({"class": "pos"+picNum, "src": "./Images/"+this.imgArr[picNum]})
				.css({position:'absolute', left: '552px', top: '10px', width:'10px', height:'10px', opacity:'0', zIndex:'0'});
			return pic;
		}
	},
	//creates the red control panel where the user can rotate the slideshow left or right, and to add or remove images from the slideshow
	this.controlPanel = (function(divId) {
		var controlPanel = $('<div></div>')
			.attr({"class": "controlPanel", "id": "controlPanel"+divId})
			.css({
				"position": "absolute",
				"left": "10px",
				"top": "520px",
				"width": "1180px",
				"height": "70px",
				"background-color": "red",
				"text-align": "center"
			});
		return controlPanel;
	})(id),
	//animates the images to the position number below theirs unless they are at pos0, which is animated to the last position, and changes the className of the images to their corresponding class
	this.rotateLeft = function() {
		$("img[class='pos0']").attr({"class": "specialPos"});
		for (i=1; i<this.imgArr.length; i++) {
			var j= i-1;
			$("img[class='pos"+i+"']").animate(this.imgCSS[j],1000);
			$("img[class='pos"+i+"']").attr({"class": "pos"+j});
		}	
		$("img[class='specialPos']").animate(this.imgCSS[this.imgArr.length-1],1000);
		$("img[class='specialPos']").attr({"class": "pos"+(this.imgArr.length-1)});
	},
	//animates the images to the position number above theirs unless they are at the last position, which they are animated to pos0, and changes the className of the images to their corresponding class
	this.rotateRight = function() {
		$("img[class='pos"+(this.imgArr.length-1)+"']").attr({"class": "specialPos"});
		for (i=this.imgArr.length-1; i>=0; i--) {
			var j= i+1;
			$("img[class='pos"+i+"']").animate(this.imgCSS[j],1000);
			$("img[class='pos"+i+"']").attr({"class": "pos"+j});
		}
		$("img[class='specialPos']").animate(this.imgCSS[0],1000);
		$("img[class='specialPos']").attr({"class": "pos0"});
	},
	//creates a left arrow image in the control panel
	this.leftArrow = (function(divId) {
		var leftArrow = $('<img></img>')
			.attr({"class": "leftArrow", "id": "leftArrow"+divId, "src":"./Images/leftArrow.jpg"})
			.css({
				"position": "absolute",
				"left": "10px",
				"top": "10px",
				"width": "50px",
				"height": "50px"
			});
		return leftArrow;
	})(id),
	//creates a right arrow image in the control panel
	this.rightArrow = (function(divId) {
		var rightArrow = $('<img></img>')
			.attr({"class": "rightArrow", "id": "rightArrow"+divId, "src":"./Images/rightArrow.jpg"})
			.css({
				"position": "absolute",
				"left": "1120px",
				"top": "10px",
				"width": "50px",
				"height": "50px"
			});
		return rightArrow;
	})(id),
	//creates a text box to input file names to add to imgArr
	this.fileText = (function(divId) {
		var fileText = $('<input></input>')
			.attr({"class": "addRemoveImg", "id": "fileText"+divId, "type": "textbox"})
			.css({
				"margin-top": "25px"
			});
		return fileText;
	})(id),
	//creates a button to add the value of the text box to imgArr and appends a new image to the slideshow
	this.addImg = (function(divId) {
		var addImg = $('<input></input>')
			.attr({"class": "addRemoveImg", "id": "addImg"+divId, "type": "button", "value": "Add Image"});
		return addImg;
	})(id),
	//creates a button that removes the center image from slideShow
	this.removeImg = (function(divId) {
		var removeImg = $('<input></input>')
			.attr({"class": "addRemoveImg", "id": "removeImg"+divId, "type": "button", "value": "Remove Center Image"})
		return removeImg;
	})(id),
	//displays everything that was created and appended to the body and divs
	this.displaySlideShow = function() {
		$("body").append(this.background);
		$(this.background).append(this.slideShowPanel);
		$(this.background).append(this.controlPanel);
		$(this.controlPanel).append(this.leftArrow);
		$(this.controlPanel).append(this.fileText);
		$(this.controlPanel).append(this.addImg);
		$(this.controlPanel).append(this.removeImg);
		$(this.controlPanel).append(this.rightArrow);
	}
}