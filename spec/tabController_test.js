(function(){
    var tabController = tddjs.ui.tabController;

    describe("test tab controller create",function(){
	var fixture;

	beforeEach(function(){
	    fixture = setFixtures('<ol id="tabs"><li><a href="#news">News</a></li><li><a href="#sports">Sports</a></li><li><a href="#economy">Economy</a></li></ol>');

	    this.tabs = document.getElementById("tabs");
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
}());