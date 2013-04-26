tddjs.namespace("util");

(function(){
    function Observable(){
	
    }

    function addObserver(observer){
	this.observers = [observer];
    }
    Observable.prototype.addObserver = addObserver;


    tddjs.util.Observable = Observable;
}());