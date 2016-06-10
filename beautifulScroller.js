// Wait for element to appear
var scrollMI = setInterval(function() {
	if (document.getElementById("MajorIssues")){
		if (document.getElementsByClassName('cool_scroller')[0].children[0].firstElementChild.length != 0) {
			clearInterval(scrollMI);
			var ts=0; //timestamp
			var step = 0.52;
			var parent = document.getElementsByClassName('cool_scroller')[0].children[0];
			var t = document.getElementsByClassName('cool_scroller')[0];
			t.style.overflow = ''; 
			var scroll = function () {
				ts += step;
				// !!! MAGIC -> leave the box alone. 280 = Major issues.height - Major issues.header.height
				if( ts>=(parent.firstElementChild.offsetHeight)*(document.getElementsByClassName('cool_scroller')[0].children[0].childElementCount) + 280 ){  
					ts=0;
					parent.firstElementChild.style.marginTop='';//reset to zero
					parent.appendChild(parent.firstElementChild);
				} else {
					parent.firstElementChild.style.marginTop='-'+ts+'px';
				}
			}
			t.addEventListener('mouseenter', function () {
				step = 0;
			}, false);
			t.addEventListener('mouseleave', function () {
				step = 0.52;
			}, false);
		var x = setInterval(scroll, 20);
		}
	}
}, 100);