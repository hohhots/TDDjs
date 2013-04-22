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

(function(){
    function iterator(collection){
	var index = 0;
	var length = collection.length;

	function next(){
	    var item = collection[index++];
	    next.hasNext = index < length;

	    return item;
	}
 
	next.hasNext = index < length;
	return next;
    }
 
    if(typeof tddjs == "object"){
	tddjs.iterator = iterator;
    }
}());

(function(){

    function isOwnProperty(object){ 
	var hasOwn = Object.prototype.hasOwnProperty;

	if(typeof hasOwn == "function"){
	    return function(object,property){
 		return hasOwn.call(object,property);
	    };
	}else{
	    //provide an emulation if you can live with possibly
	    //inaccurate results

	}

    }
 
    if(typeof tddjs == "object"){
 	tddjs.isOwnProperty = isOwnProperty();
    }
}());

(function(){
    //Returns an array of properties that are not exposed
    //in a for-in loop on the provided object
    function unEnumerated(object,properties){
	var length = properties.length;

	for( var i=0; i < length; i++){
	    object[properties[i]] = true;
	}

	var enumerated = length;

	for(var prop in object){
	    if(tddjs.isOwnProperty(object,prop)){
		enumerated -= 1;
		object[prop] = false;
	    }
	}

	if(!enumerated){
	    return;
	}

	var needsFix = [];

	for(var i = 0; i < length; i++){
	    if(object[properties[i]]){
		needsFix.push(properties[i]);
	    }
	}

	return needsFix;
    }

    var oFixes = unEnumerated({},
			      ["toString","toLocaleString","valueOf",
			       "hasOwnProperty","isPrototypeOf",
			       "constructor","propertyIsEnumerable"]);
    var fFixes = unEnumerated(function(){},
			      ["call","apply","prototype"]);
    
    if(fFixes && oFixes){
	fFixes = oFixes.concat(fFixes);
    }

    var needsFix = {"object":oFixes,"function":fFixes};

    function each(object,callback){
	if(typeof callback != "function"){
	    throw new TypeError("callback is not a function");
	} 

	//normal loop,should expose all enumerable properties
	//in conforming browsers
	for(var prop in object){
	    if(tddjs.isOwnProperty(object,prop)){
		callback(prop,object[prop]);
	    }
	}

	//Loop additional properties in none-conforming browser
	var fixes = needsFix[typeof object];

	if(fixes){
	    var property;
	    for( var i=0,l=fixes.length; i < l; i++){
		property = fixes[i];

		if(tddjs.isOwnProperty(object,property)){
		    callback(property,object[property]);
		}
	    }
	}
    }

    if(typeof tddjs == "object"){
 	tddjs.each = each;
    }
}());