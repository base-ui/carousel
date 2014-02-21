var j = require('jquery');

module.exports = Carousel;

function Carousel(el) {
  var self = this;

  self.el = el;
  self.slideElements = [];
  self.slideListElement = self.select('> .slide-list');

  var foundSlideElements = j(self.el).find('> .slide-list > .slide');

  if (foundSlideElements.length) {
    for (var i in foundSlideElements) {
      self.slideElements.push(foundSlideElements[i]);
    }
  }

  /**
   * Auto resize slideListElement
   */
  (function checkResize() {
    var slideElements = j(self.slideListElement).children().toArray();

    if (slideElements.length === 0) {
      j(self.slideListElement).width('0px');
    } else {
      j(self.slideListElement).width(slideElements[0].offsetWidth * slideElements.length);
    }

    setTimeout(checkResize, 200);
  })();
}

Carousel.prototype.select = function (selector) {
  return j(this.el).find(selector).get(0);
}

Carousel.prototype.currentSlideOrder = 1;

Carousel.prototype.continuous = true;

Carousel.prototype.animation = false;

Carousel.prototype.animationTime = 500;

Carousel.prototype.visibleAmount = 1;

Carousel.prototype.to = function (slideOrder) {
  var children = j(this.slideListElement).children().toArray();

  if (slideOrder < 1) {
    return;
  }

  if (slideOrder > children.length - this.visibleAmount + 1) {
    return;
  }

  var marginLeft = '-' + ((slideOrder - 1) * children[0].offsetWidth) + 'px';

  if (this.animation) {
    j(this.slideListElement).finish().animate({marginLeft: marginLeft}, this.animationTime, function () {
      // animation done
    });
  } else {
    this.slideListElement.style.marginLeft = marginLeft;
  }

  this.currentSlideOrder = slideOrder;
};

Carousel.prototype.left = function (amount) {
  this.to(this.currentSlideOrder - amount);
}

Carousel.prototype.right = function (amount) {
  this.to(this.currentSlideOrder + amount);
}

Carousel.prototype.next = function () {
  return this.right(1);
}

Carousel.prototype.prev = function () {
  return this.left(1);
}

Carousel.prototype.start = function () {
  return this.to(1);
}

Carousel.prototype.end = function () {
  return this.to(j(this.slideListElement).children().toArray().length - this.visibleAmount + 1);
}

Carousel.prototype.removeSlideElement = function (slideElement) {
  var children = j(this.slideListElement).children().toArray();

  if (children.indexOf(slideElement) === -1) {
    throw new Error('slide element already removed');
  }

  this.slideListElement.removeChild(slideElement);
}

Carousel.prototype.appendSlideElement = function (slideElement) {
  var children = j(this.slideListElement).children().toArray();

  if (children.indexOf(slideElement) !== -1) {
    throw new Error('slide element already appended');
  }

  this.slideListElement.appendChild(slideElement);
}

Carousel.prototype.prependSlideElement = function (slideElement) {
  var children = j(this.slideListElement).children().toArray();

  if (children.length === 0) {
    this.slideListElement.appendChild(slideElement);
  } else {
    if (children.indexOf(slideElement) !== -1) {
      throw new Error('slide element already prepended');
    }

    this.slideListElement.insertBefore(slideElement, children[0]);
  }
}
