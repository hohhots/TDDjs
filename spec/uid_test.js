describe("test uid",function(){

    it('Should return numeric id', function () {
	var id = tddjs.uid({});
	
	expect(isNaN(id)).toBeFalsy();
    });

    it('Should return consistent id for object', function () {
	var object = {};
	var id = tddjs.uid(object);

	expect(tddjs.uid(object)).toEqual(id);
    });

    it('Should return unique id', function () {
	var object = {};
	var object2 = {};
	var id = tddjs.uid(object);

	expect(tddjs.uid(object2)).not.toEqual(id);
    });

    it('Should return consistent id for function', function () {
	var func = function(){};
	var id = tddjs.uid(func);

	expect(tddjs.uid(func)).toEqual(id);
    });

    it('Should return undefined for primitive', function () {
	var str = "my string";

	expect(tddjs.uid(str)).toBeUndefined();
    });
});