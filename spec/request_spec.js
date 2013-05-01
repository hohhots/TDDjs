var ajax = tddjs.ajax;

function be(){
    this.tddjsUriParams = tddjs.util.urlParams;
    this.tddjsIsLocal = tddjs.isLocal;
    this.ajaxcreate = ajax.create;
    this.xhr = Object.create(fakeXMLHttpRequest);
    ajax.create = stubFn(this.xhr);
}

function af(){
    tddjs.util.urlParams = this.tddjsUriParams;
    tddjs.isLocal = this.tddjsIsLocal ;
    ajax.create = this.ajaxcreate;
}

describe("test get request",function(){
    beforeEach(be);

    afterEach(af);

    it('Should define get method', function () {
	expect(typeof ajax.get).toEqual("function");
    });

    it('Should throw error without url', function () {
	expect(ajax.get).toThrow();
    });

    it('Should obtain an XMLHttpRequest object', function () {
	ajax.get("/url");

	expect(ajax.create.called).toBeTruthy();
    });

    it('Should call open with method,url,async flag', function () {
	var url = "/url";
	ajax.get(url);
	
	expect({0:"GET",1:url,2:true}).toEqual(this.xhr.open.args);
    });

    it('Should add onreadystatechange handler', function () {
	ajax.get("/url");

	expect(typeof this.xhr.onreadystatechange).toEqual("function");
    });

    it('Should call send', function () {
	ajax.get("/url");

	expect(this.xhr.send.called).toBeTruthy();
    });
});

describe("test readystate handler",function(){
    beforeEach(be);

    afterEach(af);

    it('Should call success handler for status 200', function () {
	this.xhr.readyState = 4;
	this.xhr.status = 200;
	var success = stubFn();

	ajax.get("/url",{success:success});
	this.xhr.onreadystatechange();

	expect(success.called).toBeTruthy();
    });

    it('Should not throw error without success handler', function () {
	this.xhr.readyState = 4;
	this.xhr.status = 200;

	ajax.get("/url");
	expect(function(){
	    this.xhr.onreadystatechange();
	}.bind(this)).not.toThrow();
    });

    it('Should pass null as argument to send', function () {
	ajax.get("/url");

	expect(this.xhr.send.args[0]).toBeNull();
    });

    it('Should reset onreadystatechange when complete', function () {
	this.xhr.readyState = 4;
	ajax.get("/url");

	this.xhr.onreadystatechange();

	expect(this.xhr.onreadystatechange).toBe(tddjs.noop);
    });

    it('Should call success handler for local requests', function () {
	this.xhr.readyState = 4;
	this.xhr.status = 0;
	var success = stubFn();
	tddjs.isLocal = stubFn(true);

	ajax.get("file.html",{success:success});
	this.xhr.onreadystatechange();

	expect(success.called).toBeTruthy();
    });
});

describe("test request",function(){
    beforeEach(be);

    afterEach(af);

    it('Should use specified request method', function () {
	ajax.request("/url",{method:"POST"});

	expect(this.xhr.open.args[0]).toEqual("POST");
    });

    it('Should encode data', function () {
	tddjs.util.urlParams = stubFn();
	var object = {field1:"13",field:"Lots of data!"};

	ajax.request("/url",{data:object,method:"POST"});
	
	expect(tddjs.util.urlParams.args[0]).toBe(object);
    });

    it('Should send data with send() for POST', function () {
	var object = {field1:"$13",field2:"Lots of data!"};
	var expected =tddjs.util.urlParams(object);

	ajax.request("/url",{data:object,method:"POST"});

	expect(this.xhr.send.args[0]).toEqual(expected);
    });

    it('Should send data on URL for GET', function () {
	var url = "/url";
	var object = {field1:"$13",field2:"Lots of data!"};
	var expected = url + "?" + tddjs.util.urlParams(object);

	ajax.request(url,{data:object,method:"GET"});

	expect(this.xhr.open.args[1]).toEqual(expected);
    });
});

describe("test post request",function(){
    beforeEach(function(){
	this.ajaxRequest = ajax.request;
    });

    afterEach(function(){
	ajax.request = this.ajaxRequest;	
    });

    it('Should call request with POST method', function () {
	ajax.request = stubFn();
	
	ajax.post("/url");

	expect(ajax.request.args[1].method).toEqual("POST");
    });
});