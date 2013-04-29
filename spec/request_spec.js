describe("test get request",function(){
    var ajax = tddjs.ajax;

    beforeEach(function(){
	this.ajaxcreate = ajax.create;
	this.xhr = Object.create(fakeXMLHttpRequest);
	ajax.create = stubFn(this.xhr);
    });

    afterEach(function(){
	ajax.create = this.ajaxcreate;
    });

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