function onLoad() {
	try{
		var inner = '<span class="kb-star-rating"><img id="star1" class="stars" src="star_rating_empty.png"></img><img id="star2" class="stars" src="star_rating_empty.png"></img><img id="star3" class="stars" src="star_rating_empty.png"></img><img id="star4" class="stars" src="star_rating_empty.png"></img><img id="star5" class="stars" src="star_rating_empty.png"></img></span>';
		createStars(inner);
		createThanks();
		starsMouseEvents();
		
	} catch(e){
		console.log("Stars creation has failed...")
	}
}

var starsHandlers = {
	
	highlightStars: function(i){
		return function() {
			var stars = document.getElementsByClassName("stars");
			for (var j = 0; j <= i; j++) {
				stars[j].src = 'star_rating_full.png';
			}
		};
	},
	
	undoHighlight: function(i){
		return function() {
			var stars = document.getElementsByClassName("stars");
			var starsLength = stars.length -1; // Index, not value.
			// It looks funny, but I dont have idea how it should be replced, If you do, please do.
			for (var j = starsLength; i <= j; j--) {
				stars[j].src = 'star_rating_empty.png';
			}
			for (var k = 0; k <= i; k++) {
				stars[k].src = 'star_rating_empty.png';
			}
		};
	},
	
	perserveStars: function() {
		return function() {
			var stars = document.getElementsByClassName("stars");
			var k = g_form.getValue('ratingStars');
			k = k.substring(0, 1); // Because after we set it it is x/y, but we want the first value "x"
			k = k - 1;
			for (var j = 0; j <= k; j++) {
				stars[j].src = 'star_rating_full.png';
			}
		};
	},
	
	saveStarRating: function(i){
		return function() {
			copyValueToField(i);
		};
	},
	
	showThanks: function(i) {
		var rating = i+1; //Again rating not index
		document.getElementById("divInnerThanks").innerHTML = 'This feedback will be submited with: ' + rating + "/" + "5" +' <br>Thank you ! <br>';
		document.getElementById("divThanks").show("slow");
	}
	
};

function createStars(inner) {

    var content = document.getElementsByClassName("section-content catalog-section-content")[0].children[0].children[0];
    var labelStars = document.createElement("label");
    var divStars = document.createElement("tr");
    divStars.id = "divStars";
    divStars.onmouseleave = starsHandlers.perserveStars();
    divStars.style.position = "absolute";
    divStars.style.padding = "5px 25px 25px 45px";
    divStars.innerHTML = inner;
    labelStars.innerHTML = "Rating";
	labelStars.style.fontWeight = 'bold';
    labelStars.id = "labelStars";
    labelStars.style.marginLeft = "45px";
    content.insertBefore(labelStars, content.lastChild);
    content.insertBefore(divStars, content.lastChild);
}

function createThanks(){
	
	var content = document.getElementsByClassName("section-content catalog-section-content")[0].children[0].children[0];
	var divThanks = document.createElement("div");
	var divInner = document.createElement("div");
	divThanks.className = "outputmsg outputmsg_info notification notification-info";
	divThanks.style.position = "relative";
	divThanks.style.marginLeft = "45px";
	divThanks.style.marginTop = "30px";
	divThanks.style.width = "270px";
	divThanks.id = "divThanks";
	divThanks.style.display = "none";
	divInner.className = "outputmsg_text";
	divInner.id = "divInnerThanks";
	divInner.innerHTML = '';
	divThanks.appendChild(divInner);
	content.appendChild(divThanks);
	
}

function starsMouseEvents() {
    var stars = document.getElementsByClassName("stars");
    for (var i = 0; i < stars.length; i++) {
        stars[i].onmouseover = starsHandlers.highlightStars(i);
        stars[i].onmouseout = starsHandlers.undoHighlight(i);
        stars[i].onmousedown = starsHandlers.saveStarRating(i);
    }
}

function copyValueToField(i) {
    g_form.setValue('ratingStars', i + 1 + "/" + "5"); // i+1 beacuse i is the index, thus 1 star would have index of 0
	starsHandlers.showThanks(i);
}