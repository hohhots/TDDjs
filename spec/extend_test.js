describe("test object extend",function(){
    beforeEach(function(){
	this.dummy = {
	    setName:function(name){
		return (this.name = name);
	    },
	    getName:function(){
		return this.name || null;
	    }
	};
    });

    it('Should copy properties', function () {
	var object = {};

	tddjs.extend(object,this.dummy);

	expect(typeof object.getName).toEqual("function");
	expect(typeof object.setName).toEqual("function");
    });

    it('Should return new object when target is null', function () {
	var object = tddjs.extend(null,this.dummy);

	expect(typeof object.getName).toEqual("function");
	expect(typeof object.setName).toEqual("function");
    });

    it('Should untouch target when no source', function () {
	var object = tddjs.extend({});
	var properties = [];

	for(var pro in object){
	    if(tddjs.isOwnProperty(object,pro)){
		properties.push(pro);
	    }
	}

	expect(properties.length).toEqual(0);
    });
});