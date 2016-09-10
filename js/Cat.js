var catNames = ['Bob', 'Joe', 'Ethan', 'Corey', 'Greg'];

class Cat {
  constructor(num) {
    this.clickCount = 0;
    this.imgSRC = "img/cat" + num + ".jpg";
    this.catName = catNames[num];
  }

  clicked() {
    this.clickCount++;
    controller.requestClickCounterUpdate(this.clickCount);
  }
}
