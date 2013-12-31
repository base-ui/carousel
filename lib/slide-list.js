var eventy = require('eventy');
var j = require('jquery');

module.exports = SlideList;

function SlideList(el) {
  var thisSlides = eventy(this);
  var checkInterval = 100;

  this.el = el;

  var slidesWidth = 0;
  var slidesHeight = 0;

  if (j(this.el).hasClass('vertical')) {
    this.direction = 'vertical';
  }

  (function checkSize() {
    var slides = thisSlides.getSlides();
    var currentSlidesWidth = 0;
    var currentSlidesHeight = 0;

    for (var i = 0; i < slides.length; i++) {
      currentSlidesWidth += j(slides[i]).width();
      currentSlidesHeight += j(slides[i]).height();
    }

    if (currentSlidesWidth !== slidesWidth || currentSlidesHeight !== slidesHeight) {
      thisSlides.trigger('resize');
    }

    slidesWidth = currentSlidesWidth;
    slidesHeight = currentSlidesHeight;
    setTimeout(checkSize, checkInterval);
  })();
}

SlideList.prototype.direction = 'horizontal';

SlideList.prototype.getSlides = function () {
  var slides = [];

  j(this.el).find('>.slide').each(function (i, item) {
    slides.push(item);
  });

  return slides;
}

SlideList.prototype.first = function () {
  return this.getSlides().shift();
}

SlideList.prototype.last = function () {
  return this.getSlides().pop();
}

SlideList.prototype.shift = function () {
  return this.el.removeChild(this.first());
}

SlideList.prototype.pop = function () {
  return this.el.removeChild(this.last());
}

SlideList.prototype.append = function (slide) {
  return this.el.appendChild(slide);
}

SlideList.prototype.prepend = function (slide) {
  return this.el.insertBefore(slide, this.first());
}

// SlideList.prototype.getSlideWidth = function () {
//   return j(this.getSlides()[0]).width();
// }

// SlideList.prototype.getSlideHeight = function () {
//   return j(this.getSlides()[0]).height();
// }

// SlideList.prototype.getSlidesWidth = function () {
//   return this.getSlideWidth() * this.getSlides().length;
// }

// SlideList.prototype.getSlidesHeight = function () {
//   return this.getSlideHeight() * this.getSlides().length;
// }

// SlideList.prototype.setWidth = function (width) {
//   j(this.el).width(width);
// }

// SlideList.prototype.getWidth = function () {
//   return j(this.el).width();
// }

// SlideList.prototype.setHeight = function (height) {
//   j(this.el).height(height);
// }

// SlideList.prototype.getHeight = function () {
//   return j(this.el).height();
// }
