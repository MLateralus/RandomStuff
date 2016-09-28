function getTitles(elems){
	var titles = [];
	for(var i=0; i<elems.length; i++){
		var u = elems[i].innerHTML.replace(/[^a-z0-9-" "]/gi,'');
		titles.push(u);
		}
	return titles
	//return titles.filter(function(elem){ return (elem.indexOf("Angular") > 0 || elem.indexOf("angular") > 0) })
}

getTitles(document.getElementsByClassName("title"))