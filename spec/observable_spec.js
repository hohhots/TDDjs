beforeEach(function(){
    this.observable = Object.create(tddjs.util.observable);
});

describe("observable add observer test",function(){

    it('Should store function', function () {
	var observers = [function(){},function(){}];

	this.observable.observe("event",observers[0]);
	this.observable.observe("event",observers[1]);

	expect(this.observable.hasObserver("event",observers[0])).toBeTruthy();
	expect(this.observable.hasObserver("event",observers[1])).toBeTruthy();
    });

});

describe("test observable has observer",function(){
    it('Should return true when has observer', function () {
	var observer = function(){};

	this.observable.observe("event",observer);
	expect(this.observable.hasObserver("event",observer)).toBeTruthy();
    });

    it('Should return false when no observers', function () {
	expect(this.observable.hasObserver("event",function(){})).toBeFalsy();
    });
});

describe("test observable notify observers",function(){
    it('Should call all observers', function () {
	var observer1 = function(){observer1.called = true;};
	var observer2 = function(){observer2.called = true;};

	this.observable.observe("event",observer1);
	this.observable.observe("event",observer2);
	this.observable.notify("event");

	expect(observer1.called).toBeTruthy();
	expect(observer2.called).toBeTruthy();
    });

    it('Should not fail if no observers', function () {
	expect(this.observable.notify).not.toThrow();
    });

    it('Should pass through arguments', function () {
	var actual;
	
	this.observable.observe("event",function(){
	    actual = arguments;
	});

	this.observable.notify("event","String",1,32);

	expect(actual).toEqual({0:"String",1:1,2:32});
    });

    it('Should throw for uncallable observer', function () {
	expect(function(){
	    this.observable.observe("event",{});
	}).toThrow();
    });

    it('Should notify all even when some fail', function () {
	var observer1 = function(){throw new Error("Oops");};
	var observer2 = function(){observer2.called = true;};

	this.observable.observe("event",observer1);
	this.observable.observe("event",observer2);
	this.observable.notify("event");

	expect(observer2.called).toBeTruthy();
    });

    it('Should call observers in the order they were added', function () {
	var calls = [];
	var observer1 = function(){calls.push(observer1);};
	var observer2 = function(){calls.push(observer2);};
	this.observable.observe("event",observer1);
	this.observable.observe("event",observer2);

	this.observable.notify("event");

	expect(calls[0]).toEqual(observer1);
	expect(calls[1]).toEqual(observer2);
    });

    it('Should notify relevant observers only', function () {
	var calls = [];
	
	this.observable.observe("event",function(){
	    calls.push("event");
	});

	this.observable.observe("other",function(){
	    calls.push("other");
	});

	this.observable.notify("other");
	
	expect(calls).toEqual(["other"]);
    });
});