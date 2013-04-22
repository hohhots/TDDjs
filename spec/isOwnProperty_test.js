describe("test tddjs.isOwnProperty",function(){
    it('Should return true for own property,false for none own property', function () {
	var object = {name:"ff"};

	expect(tddjs.isOwnProperty(object,"name")).toBeTruthy();
	expect(tddjs.isOwnProperty(object,"toString")).toBeFalsy();
    });
});