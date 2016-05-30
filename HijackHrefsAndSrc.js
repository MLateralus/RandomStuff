var scripts = Array.prototype.slice.call(document.getElementsByTagName("script"));
var links = Array.prototype.slice.call(document.getElementsByTagName("link"));
var images = Array.prototype.slice.call(document.getElementsByTagName("img"));
var as = Array.prototype.slice.call(document.getElementsByTagName("a"));

hijackHrefs(scripts);
hijackHrefs(links);
hijackHrefs(images);
hijackHrefs(as);

function hijackHrefs (elem_type){
  for (var i =0; i<elem_type.length; i++){
  elem_type[i].href = elem_type[i].href;
  elem_type[i].src = elem_type[i].src;
  }
}
