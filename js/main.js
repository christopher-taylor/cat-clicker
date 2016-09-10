var model = {
  currentCat: undefined,
  cats: [],

  init: function(numCats) {
    this.createCats(numCats);
  },

  createCats: function(numCats) {
    for (var i = 0; i < numCats; i++) {
      this.cats.push(new Cat(i));
    }
    this.currentCat = this.cats[1];
  },
};

var controller = {
  init: function(numCats) {
    model.init(numCats);
    view.init();
  },

  catClicked: function() {
    model.currentCat.clicked();
  },

  getCat: function(catNumber) {
    return model.cats[catNumber];
  },

  getNumberOfCats: function() {
    return model.cats.length;
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCurrentCatName: function() {
    return model.currentCat.catName;
  },

  getCurrentCatURL: function() {
    return model.currentCat.imgSRC;
  },

  getCurrentCatClicks: function() {
    return model.currentCat.clickCount;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  setCurrentCatName: function(catName) {
    model.currentCat.catName = catName;
  },

  setCurrentCatURL: function(url) {
    model.currentCat.imgSRC = url;
  },

  setCurrentCatClicks: function(num) {
    model.currentCat.clickCount = num;
  },

  requestClickCounterUpdate: function(num) {
    view.updateClickCounter(num);
  }
};

var view = {
  init: function() {
    this.createCatSelectionList();
    this.updateCatContainer(controller.getCat([1]));
    this.setOnClicks();
  },

  createCatLinkList: function() {
    for (var i = 0; i < controller.getNumberOfCats(); i++) {
      var li = '<li><a href="#" class="cat-link" id="' + i + '">' + controller.getCat(i).catName + '</a></li>';
      $("#cat-name-list").append(li);
    }
    return $('.cat-link').toArray();
  },

  addLinkListFunctionality: function(catLinks) {
    for (var i = 0; i < catLinks.length; i++) {
      catLinks[i].onclick = view.getOnClickFunction(i);
    }
  },

  getOnClickFunction: function(i) {
    return function() {
      view.updateCatContainer(controller.getCat(i));
    };
  },

  createCatSelectionList: function() {
    var linkList = this.createCatLinkList();
    this.addLinkListFunctionality(linkList);
  },


  updateClickCounter: function(num) {
    $("#num-clicks").text(num);
  },

  updateCatContainer: function(cat) {
    controller.setCurrentCat(cat);
    $("#cat-name").text(controller.getCurrentCatName());
    $("#num-clicks").text(controller.getCurrentCatClicks());
    $("#cat-img").attr("src", controller.getCurrentCatURL());
  },

  setOnClicks: function() {
    $("#cat-img").click(function() {
      controller.catClicked();
    });
    $("#show-hide-admin").click(function() {
      view.toggleHideables();
    });
    $("#cancel").click(function() {
      view.closeAdminArea();
    });
    $("#save").click(function() {
      controller.setCurrentCatName($("#name-field").val());
      controller.setCurrentCatURL($("#img-field").val());
      controller.setCurrentCatClicks($("#clicks-field").val());
      view.closeAdminArea();
      view.updateCatContainer(controller.getCurrentCat());
    });
  },

  clearAdminFields: function() {
    var fieldsToClear = [$("#name-field"), $("#img-field"), $("#clicks-field")];
    fieldsToClear.forEach(function(field) {
      field.val("");
    });
  },

  closeAdminArea: function() {
    this.toggleHideables();
    this.clearAdminFields()
  },

  toggleHideables: function() {
    var hideables = [$("#cancel"), $("#save"), $("#name-field-wrapper"), $("#img-field-wrapper"), $("#clicks-field-wrapper")];
    var newState = 'none';
    if (hideables[0].css('display') === 'none') {
      newState = 'inline';
      $("#name-field").val(controller.getCurrentCatName());
      $("#img-field").val(controller.getCurrentCatURL());
      $("#clicks-field").val(controller.getCurrentCatClicks());
    }
    hideables.forEach(function(elem) {
      elem.css('display', newState);
    });
    //TODO: SET THE VALUE OF ALL THE FIELDS
  }
};

$(document).ready(controller.init(5));
