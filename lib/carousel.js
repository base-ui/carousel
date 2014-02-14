var j = require('jquery');
var SlideList = require('./slide-list');

module.exports = Carousel;

function Carousel(el) {
  var self = this;

  self.el = el;
  self.currentSlideIndex = 0;
  self.currentSlideOrder = 1;
  self.slideList = new SlideList(j(self.el).find('>.slide-list').get(0));
  self.slideList.autoResize();
}

Carousel.prototype.speed = 500;

Carousel.prototype.continuous = true;

Carousel.prototype.toSlideByIndex = function (index) {
  var self = this;

  if (index < 0) {
    return;
  }

  if (index > self.slideList.count() - 1) {
    return;
  }

  if (index > self.currentSlideIndex) {
    self.right(index - self.currentSlideIndex);
  }

  if (index < self.currentSlideIndex) {
    self.left(self.currentSlideIndex - index);
  }
}

Carousel.prototype.toSlideByOrder = function (order) {
  return this.toSlideByIndex(order - 1);
}

// Alias of toSlideByOrder
Carousel.prototype.to = Carousel.prototype.toSlideByOrder;

Carousel.prototype.left = function (shift) {
  var self = this;

  console.log('self.currentSlideOrder - shift', self.currentSlideOrder - shift);

  if (self.currentSlideOrder - shift < 1) {
    return;
  }

  if (self.continuous) {
    // Todo
  } else {
    var currentMarginLeft = parseInt(self.slideList.el.style.marginLeft.replace(/[^-\d\.]/g, ''));
    var shiftDistance = shift * self.slideList.first().getWidth();

    j(self.slideList.el).finish().animate({marginLeft: currentMarginLeft + shiftDistance}, self.speed, function () {});
  }

  self.currentSlideOrder = self.currentSlideOrder - shift;
  self.currentSlideIndex = self.currentSlideOrder - 1;
}

Carousel.prototype.right = function (shift) {
  var self = this;

  if (self.currentSlideOrder + shift > self.slideList.count()) {
    return;
  }

  if (self.continuous) {
    // Todo
  } else {
    var currentMarginLeft = parseInt(self.slideList.el.style.marginLeft.replace(/[^-\d\.]/g, ''));
    var shiftDistance = shift * self.slideList.first().getWidth();

    j(self.slideList.el).finish().animate({marginLeft: currentMarginLeft - shiftDistance}, self.speed, function () {});
  }

  self.currentSlideOrder = self.currentSlideOrder + shift;
  self.currentSlideIndex = self.currentSlideOrder - 1;
}

Carousel.prototype.next = function () {
  return this.right(1);
}

Carousel.prototype.prev = function () {
  return this.left(1);
}

Carousel.prototype.start = function () {
  return this.toSlideByOrder(1);
}

Carousel.prototype.end = function () {
  return this.toSlideByOrder(this.slideList.count());
}
