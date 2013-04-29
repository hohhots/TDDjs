describe("tes ajax create",function(){
    it('Should return XMLHttpRequest object', function () {
	var xhr = tddjs.ajax.create();

	expect(!isNaN(xhr.readyState)).toBeTruthy();
	expect(tddjs.isHostMethod(xhr,"open")).toBeTruthy();
	expect(tddjs.isHostMethod(xhr,"send")).toBeTruthy();
	expect(tddjs.isHostMethod(xhr,"setRequestHeader")).toBeTruthy();
    });
});