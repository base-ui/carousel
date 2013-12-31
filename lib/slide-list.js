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
      currentSlidesWidth += slides[i].offsetWidth;
      currentSlidesHeight += slides[i].offsetHeight;
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
