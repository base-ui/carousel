var j = require('jquery');
var eventy = require('eventy');
var Slide = require('./slide');
var List = require('list');
var supportProto = Object.getPrototypeOf({__proto__: null}) === null;

module.exports = SlideList;

function SlideList(el) {
  List.apply(this, arguments);
  var self = eventy(this);

  self.el = el;
  // self.memorSlides = new Slides;

  j(self.el).find('>.slide').each(function (i, item) {
    self.append(new Slide(item));
  });

  // Give marginLeft a init value
  self.el.style.marginLeft = '0px';
}

if (supportProto) {
  SlideList.prototype.__proto__ = List.prototype;
} else {
  SlideList.prototype = Object.create(List.prototype);
}

SlideList.prototype.findSlidesElements = function () {
  var slides = [];

  j(this.el).find('>.slide').each(function (i, item) {
    slides.push(item);
  });

  return slides;
}

SlideList.prototype.getSlidesWidth = function () {
  var self = this;
  var totalWidth = 0;

  self.each(function (slide, i) {
    totalWidth += slide.getWidth();
  });

  return totalWidth;
}

SlideList.prototype.getSlidesHeight = function () {
  var self = this;
  var totalHeight = 0;

  self.each(function (slide, i) {
    totalHeight += slide.getHeight();
  });

  return totalHeight;
}

SlideList.prototype.direction = 'horizontal';

SlideList.prototype.setDirection = function (direction) {
  this.removeClass(this.direction);
  this.addClass(direction);
  this.direction = direction;
}

SlideList.prototype.getDirection = function () {
  return this.direction;
}

SlideList.prototype.addClass = function (className) {
  j(this.el).addClass(className);
}

SlideList.prototype.removeClass = function (className) {
  j(this.el).removeClass(className);
}

SlideList.prototype.getWidth = function () {
  return this.el.offsetWidth;
}

SlideList.prototype.getHeight = function () {
  return this.el.offsetHeight;
}

SlideList.prototype.setWidth = function (width) {
  j(this.el).width(width);
}

SlideList.prototype.setHeight = function (height) {
  j(this.el).height(height);
}

SlideList.prototype.autoResize = function () {
  var self = this;

  if (self.didAutoResize) {
    return;
  }

  self.didAutoResize = true;

  self.each(function (slide, i) {
    slide.watchResize();

    slide.on('resize', function () {
      if (self.direction === 'horizontal') {
        self.setWidth(self.getSlidesWidth());
        self.setHeight(self.first().getHeight());
      }

      if (self.direction === 'vertical') {
        self.setWidth(self.first().getWidth());
        self.setHeight(self.getSlidesHeight());
      }
    });
  });
}

SlideList.prototype._remove = SlideList.prototype.remove;

SlideList.prototype.remove = function (slide) {
  var self = this;

  if (!self.has(slide)) {
    return;
  }

  self._remove(slide);
  self.el.removeChild(slide.el);
}

SlideList.prototype._append = SlideList.prototype.append;

SlideList.prototype.append = function (slide) {
  var self = this;

  if (self.has(slide)) {
    return;
  }

  self._append(slide);

  return self.el.appendChild(slide.el);
}

SlideList.prototype._prepend = SlideList.prototype.prepend;

SlideList.prototype.prepend = function (slide) {
  var self = this;

  if (self.has(slide)) {
    return;
  }

  self._prepend(slide);

  return self.el.insertBefore(slide.el, self.first().el);
}
