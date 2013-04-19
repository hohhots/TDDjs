describe("Test namespace of tddjs",function(){
    afterEach(function(){
	delete tddjs.nstest;
    });

    it('Should create none-existent object', function () {
	tddjs.namespace("nstest");
	 
	expect(tddjs.nstest).toBeDefined();  
    });

    it('Should not overwrite existing objects', function () {
	tddjs.nstest = {nested:{}};
	var result = tddjs.namespace("nstest.nested");

    	expect(tddjs.nstest.nested).toBe(result);  
    });

    it('Should only create missing parts', function () {
	var existing = {}; 
	tddjs.nstest = {nested:{existing:existing}};
	var result = tddjs.namespace("nstest.nested.ui");

	expect(tddjs.nstest.nested.existing).toBe(existing);
	expect(tddjs.nstest.nested.ui).toBeDefined(); 
    });

    it('test namespacing inside other objects', function () {
	var custom = {namespace:tddjs.namespace};
	custom.namespace("dom.event");

	expect(custom.dom.event).toBeDefined();
	expect(tddjs.dom).toBeUndefined();
    });
});