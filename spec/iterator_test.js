describe("Test iterator",function(){
    it('test next Should return first item', function () {
	var collection = [1,2,3,4,5];
	var iterator = tddjs.iterator(collection);
 
	expect(iterator()).toBe(collection[0]);
	expect(iterator.hasNext).toBeTruthy();
    });

    it('test hasNext Should be false after last item ', function () {
	var collection = [1,2];
	var iterator = tddjs.iterator(collection);

	iterator();
	iterator();

	expect(iterator.hasNext).toBeFalsy();
    });

    it('Should loop collection with iterator', function () {
	var collection = [1,2,3,4,5];
	var iterator = tddjs.iterator(collection);
	var result = [];

	while(iterator.hasNext){
	    result.push(iterator());
	}

	expect(result).toEqual(collection);
    });
});