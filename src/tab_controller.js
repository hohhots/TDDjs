(function () {
  var dom = tddjs.dom;

  function create(element) {
    if (!element || typeof element.className != "string") {
      throw new TypeError("element is not an element");
    }

    dom.addClassName(element, "js-tab-controller");
    var tabs = Object.create(this);

    element.onclick = function (event) {
      tabs.handleTabClick(event || window.event || {});
    };

    element = null;

    return tabs;
  }

  function handleTabClick(event) {
    
  }

  function activateTab(element) {
  
  }

  tddjs.namespace("ui").tabController = {
    create: create,
    handleTabClick: handleTabClick,
    activateTab: activateTab,
    onTabChange: function (anchor, previous) {},
    tabTagName: "a"
  };
}());