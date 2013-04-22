describe("test tddjs each function",function(){
    it('Should enumerate shadowed object properties', function () {
	var object = {
	    //Properties with DontEnum on Object.prototype
	    toString:"toString",
	    toLocaleString:"toLocaleString",
	    valueOf:"valueOf",
	    hasOwnProperty:"hasOwnProperty",
	    isPrototypeOf:"isPrototypeOf",
	    propertyIsEnumerable:"propertyIsEnumarable",
	    constructor:"constructor"
	};

	var result = [];

	tddjs.each(object,function(prop,value){
	    result[prop] = value;
	});

	expect(result.length).toEqual(7);
    });

    it('Should enumerate shadowed function properties', function () {
	var object = function(){};
	
	//additional properties with DontEnum on
	//Function.prototype
	object.prototype = "prototype";
	object.call = "call";
	object.apply = "apply";
	
	var result = [];

	tddjs.each(object,function(prop,value){
	    result[prop] = value;
	});

	expect(result.length).toEqual(3);
    });

});