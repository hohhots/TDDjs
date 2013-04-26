var observable;

beforeEach(function(){
    observable = new tddjs.util.Observable();
});

describe("observable add observer test",function(){

    it('Should store function', function () {
	var observers = [function(){},function(){}];

	observable.addObserver(observers[0]);
	observable.addObserver(observers[1]);

	expect(observable.hasObserver(observers[0])).toBeTruthy();
	expect(observable.hasObserver(observers[1])).toBeTruthy();
    });

});

describe("test observable has observer",function(){
    it('Should return true when has observer', function () {
	var observer = function(){};

	observable.addObserver(observer);
	expect(observable.hasObserver(observer)).toBeTruthy();
    });

    it('Should return false when no observers', function () {
	expect(observable.hasObserver(function(){})).toBeFalsy();
    });
});

describe("test observable notify observers",function(){
    it('Should call all observers', function () {
	var observer1 = function(){observer1.called = true;};
	var observer2 = function(){observer2.called = true;};

	observable.addObserver(observer1);
	observable.addObserver(observer2);
	observable.notifyObservers();

	expect(observer1.called).toBeTruthy();
	expect(observer2.called).toBeTruthy();
    });

    it('Should pass through arguments', function () {
	var actual;
	
	observable.addObserver(function(){
	    actual = arguments;
	});

	observable.notifyObservers("String",1,32);

	expect(actual).toEqual({0:"String",1:1,2:32});
    });

    it('Should throw for uncallable observer', function () {
	expect(function(){
	    observable.addObserver({});
	}).toThrow();
    });

    it('Should notify all even when some fail', function () {
	var observer1 = function(){throw new Error("Oops");};
	var observer2 = function(){observer2.called = true;};

	observable.addObserver(observer1);
	observable.addObserver(observer2);
	observable.notifyObservers();

	expect(observer2.called).toBeTruthy();
    });

    it('Should call observers in the order they were added', function () {
	var calls = [];
	var observer1 = function(){calls.push(observer1);};
	var observer2 = function(){calls.push(observer2);};
	observable.addObserver(observer1);
	observable.addObserver(observer2);

	observable.notifyObservers();

	expect(calls[0]).toEqual(observer1);
	expect(calls[1]).toEqual(observer2);
    });
});