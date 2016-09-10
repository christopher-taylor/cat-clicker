var initialCats = [{
    clickCount: 0,
    name: "Bob",
    imgSRC: './img/cat0.jpg',
    imgAttribution: "https://www.udacity.com",
    nickname: ["cat", "kat", "that fucking thing", "dickbuttz"]
}, {
    clickCount: 0,
    name: "Joe",
    imgSRC: './img/cat1.jpg',
    imgAttribution: "https://www.udacity.com",
    nickname: ["cat", "kat", "that fucking thing", "dickbuttz"]
}, {
    clickCount: 0,
    name: "Ethan",
    imgSRC: './img/cat2.jpg',
    imgAttribution: "https://www.udacity.com",
    nickname: ["cat", "kat", "that fucking thing", "dickbuttz"]
}, {
    clickCount: 0,
    name: "Corey",
    imgSRC: './img/cat3.jpg',
    imgAttribution: "https://www.udacity.com",
    nickname: ["cat", "kat", "that fucking thing", "dickbuttz"]
}, {
    clickCount: 0,
    name: "Greg",
    imgSRC: './img/cat4.jpg',
    imgAttribution: "https://www.udacity.com",
    nickname: ["cat", "kat", "that fucking thing", "dickbuttz"]
}];

var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSRC = ko.observable(data.imgSRC);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.nickname = ko.observable(data.nickname);

    this.level = ko.computed(function() {
        var clicks = this.clickCount();
        if (clicks < 5) {
            return "Nub";
        } else if (clicks < 10) {
            return "Killing Spree";
        } else if (clicks < 15) {
            return "Rampage";
        } else if (clicks < 20) {
            return "Dominating"
        } else if (clicks < 25) {
            return "Unstoppable";
        } else if (clicks < 30) {
            return "GODLIKE";
        } else {
            return "WICKED SICK";
        }
    }, this);
}

var ViewModel = function() {
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catData) {
        self.catList.push(new Cat(catData));
    });

    this.currentCat = ko.observable(this.catList()[1]);

    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };

    this.changeCurrentCat = function(cat) {
        self.currentCat(cat);
    };
};

ko.applyBindings(new ViewModel());
