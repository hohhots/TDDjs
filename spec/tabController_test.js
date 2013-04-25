(function(){
    var tabController = tddjs.ui.tabController;

    var fixture; 

    function setUp(){
	fixture = setFixtures('<ol id="tabs"><li><a href="#news">News</a></li><li><a href="#sports">Sports</a></li><li><a href="#economy">Economy</a></li></ol>');

	this.tabs = document.getElementById("tabs");
    }

    describe("test tab controller create",function(){
	
	beforeEach(function(){
	    setUp.call(this);
	});

	it('Should fail without element', function () {
	    expect(function(){
		tabController.create();
	    }).toThrow(new TypeError("element is not an element"));
	});

	it('Should fail without element class', function () {
	    expect(function(){
		    tabController.create({});
		}).toThrow(new TypeError("element is not an element"));
	});

	it('Should return object', function () {
	    var controller = tabController.create(this.tabs);

	    expect(typeof controller == "object").toBeTruthy();
	});

	it('Should add js-tabs class name to element', function () {
	    var tabs = tabController.create(this.tabs);

	    expect(this.tabs.className).toEqual("js-tab-controller");
	});
	
    });

    describe("test tabbedController active tab",function(){
	beforeEach(function(){
	    setUp.call(this);
	    this.controller = tabController.create(this.tabs);
	    this.links = this.tabs.getElementsByTagName("a");
	    this.lis = this.tabs.getElementsByTagName("li");
	});

	it('Should not fail without anchor', function () {
	    var controller = this.controller;

	    expect(controller.activateTab).not.toThrow();
	});

	it('Should mark anchor as active', function () {
	    this.controller.activateTab(this.links[0]);

	    expect(this.links[0].className).toEqual("active-tab");
	});

	it('Should deactivate previous tab', function () {
	    this.controller.activateTab(this.links[0]);
	    this.controller.activateTab(this.links[1]);

	    expect(this.links[0]).not.toMatch(/(^|\s)active-tab(\s|$)/);
	    expect(this.links[1].className).toEqual("active-tab");
	});

	it('Should not activate unsupported element types', function () {
	    this.controller.activateTab(this.links[0]);
	    this.controller.activateTab(this.lis[0]);

	    expect(this.lis[0]).not.toMatch(/(^|\s)active-tab(\s|$)/);
	    expect(this.links[0].className).toEqual("active-tab");
	});

	it('Should fire onTabChange', function () {
	    var actualPrevious, actualCurrent;
	    this.controller.activateTab(this.links[0]);
	    this.controller.onTabChange = function(curr, prev){
		actualPrevious = prev;
		actualCurrent = curr;
	    };

	    this.controller.activateTab(this.links[1]);
	    
	    expect(this.links[0]).toBe(actualPrevious);
	    expect(this.links[1]).toBe(actualCurrent);
	});
    });
}());