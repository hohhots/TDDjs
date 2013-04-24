(function(){
    var tabController = tddjs.ui.tabController;

    function setUp(){
	/*DOC += <ol id="tabs">
	  
	  </ol>*/

	this.tabs = document.getElementById("tabs");
    }

    describe("test tab controller create",function(){
	beforeEach(setUp);

	it('Should fail without element', function () {
	    expect(function(){
		tabController.create();
	    }).toThrow(new TypeError("element is not an element"));
	});

	it('Should fail without element class', function () {
	    expect(
		function(){
		    tabController.create({});
		}).toThrow(new TypeError("element is not an element"));
	});

	it('Should return object', function () {
	    var controller = tabController.create(this.tabs);

	    expect(typeof controller == "object").toBeTruthy();
	});

	
    });
}());