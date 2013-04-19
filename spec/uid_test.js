describe("test uid",function(){

    it('Should return numeric id', function () {
	var id = tddjs.uid({});
	
	expect(!isNaN(id)).toBeTruthy();
    });
});