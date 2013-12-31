var j = require('jquery');
var SlideList = require('./slide-list');

module.exports = Carousel;

function Carousel(el) {
  var thisCarousel = this;

  this.el = el;
  this.speed = 500;
  this.currentSlide = 1;
  this.slideList = new SlideList(j(this.el).find('>.slide-list').get(0));
  resizeSlideList();

  thisCarousel.slideList.on('resize', function () {
    resizeSlideList();
  });

  function resizeSlideList() {
    var slides = thisCarousel.slideList.getSlides();

    if (thisCarousel.slideList.direction === 'horizontal') {
      j(thisCarousel.slideList.el).width(j(slides[0]).width() * slides.length);
    }

    if (thisCarousel.slideList.direction === 'vertical') {
      j(thisCarousel.slideList.el).height(j(slides[0]).height() * slides.length);
    }
  }
}

Carousel.prototype.to = function (slide) {
  var slides = this.slideList.getSlides();

  if (slide < 1) {
    slide = 1;
  }

  if (slide > slides.length) {
    slide = slides.length;
  }

  if (slide > this.currentSlide) {
    this.right(slide - this.currentSlide);
  } else {
    this.left(this.currentSlide - slide);
  }

  // var half = slides.length / 2;
  // var differ = slide - this.currentSlide;

  // if (differ > 0) {
  //   if (differ > half) {
  //     this.left(half - slides.length - slide);
  //   } else {
  //     this.right(differ);
  //   }
  // } else {
  //   if ((this.currentSlide - slide) > (slides.length / 2)) {
  //     this.right(slides.length - this.currentSlide + slide);
  //   } else {
  //     this.left(this.currentSlide - slide);
  //   }
  // }

  // if (Math.abs((slide - this.currentSlide)) < (slides.length / 2)) {
  //   this.right(Math.abs((slide - this.currentSlide)));
  // } else {
  //   this.left(Math.abs((slide - this.currentSlide)));
  // }
}

Carousel.prototype.left = function (slidesAmount) {
  var thisCarousel = this;
  var slides = this.slideList.getSlides();
  var slidesWidth = j(slides[0]).width() * slidesAmount;

  this.currentSlide = ((this.currentSlide - slidesAmount) + (1000 * slides.length)) % slides.length;

  if (this.currentSlide === 0) {
    this.currentSlide = slides.length;
  }

  for (var i = 0; i < slidesAmount; i++) {
    this.slideList.prepend(this.slideList.pop());
  }

  j(this.slideList.el).css('margin-left', -slidesWidth);
  j(this.slideList.el).finish().animate({marginLeft: '0px'}, this.speed, function () {});
}

Carousel.prototype.right = function (slidesAmount) {
  var thisCarousel = this;
  var slides = this.slideList.getSlides();
  var slidesWidth = j(slides[0]).width() * slidesAmount;

  this.currentSlide = Math.abs((this.currentSlide + slidesAmount) % slides.length);

  if (this.currentSlide === 0) {
    this.currentSlide = slides.length;
  }

  j(this.slideList.el).finish().animate({marginLeft: -slidesWidth}, this.speed, function () {
    for (var i = 0; i < slidesAmount; i++) {
      thisCarousel.slideList.append(thisCarousel.slideList.shift());
    }

    j(thisCarousel.slideList.el).css('margin-left', '0px');
  });
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
  return this.to(this.slideList.getSlides().length);
}
