var tddjs = (function(){
    function namespace(string){
	var object = this;
	var levels = string.split(".");

	for( var i=0, l=levels.length; i < l; i++){
	    if(typeof object[levels[i]]=="undefined"){
		object[levels[i]] = {};
	    }

	    object = object[levels[i]];
	}

	return object; 
    }

    return {namespace:namespace};
}());

(function(){
    var id = 0;

    function uid(object){
	if(typeof object._uid != "number"){
	    object._uid = id++;
	}

	return object._uid;
    }
 
    if(typeof tddjs == "object"){
	tddjs.uid = uid;
    }
}());