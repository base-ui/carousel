var j = require('jquery');
var eventy = require('eventy');

module.exports = Slide;

function Slide(el) {
  if (el.__slide__) {
    return el.__slide__;
  }

  var self = eventy(this);

  self.el = el;
  self.el.__slide__ = self;
}

Slide.prototype.memorWidth = 0;
Slide.prototype.memorHeight = 0;

Slide.prototype.getWidth = function () {
  return this.el.offsetWidth;
}

Slide.prototype.getHeight = function () {
  return this.el.offsetHeight;
}

Slide.prototype.setWidth = function (width) {
  j(this.el).width(width);
}

Slide.prototype.setHeight = function (height) {
  j(this.el).height(height);
}

Slide.prototype.watchResize = function () {
  var self = this;
  var checkInterval = 100;

  self.memorWidth = self.getWidth();
  self.memorHeight = self.getHeight();

  (function check() {
    var actualWidth = self.getWidth();
    var actualHeight = self.getHeight();

    if (self.memorWidth !== actualWidth || self.memorHeight !== actualHeight) {
      self.memorWidth = actualWidth;
      self.memorHeight = actualHeight;
      self.trigger('resize');
    }

    setTimeout(check, checkInterval);
  })();

  self.didWatchResize = true;
}
