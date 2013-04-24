(function(){
    var tabController = tddjs.ui.tabController;

    describe("test tab controller create",function(){
	var fixture;
	
	beforeEach(function(){
	    fixture = loadFixtures(setFixtures('<ol id="tabs"><li><a href="#news">News</a></li><li><a href="#sports">Sports</a></li><li><a href="#economy">Economy</a></li></ol>'));

	    this.tabs = document.getElementById("tabs");
	});

	it('Should fail without element', function () {
	    fixture.myTestedJqueryPlugin();

	    expect(function(){
		tabController.create();
	    }).toThrow(new TypeError("element is not an element"));
	});

	it('Should fail without element class', function () {
	    fixture.myTestedJqueryPlugin();

	    expect(function(){
		    tabController.create({});
		}).toThrow(new TypeError("element is not an element"));
	});

	it('Should return object', function () {
	    var controller = tabController.create(this.tabs);

	    expect(typeof controller == "object").toBeTruthy();
	});

	
    });
}());