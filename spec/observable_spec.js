describe("observable add observer test",function(){
    it('Should store function', function () {
	var observable = new tddjs.util.Observable();
	var observer = function(){};

	observable.addObserver(observer);

	expect(observable.observers[0]).toEqual(observer);
    });
});