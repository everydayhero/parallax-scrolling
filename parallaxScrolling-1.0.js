function parallaxScroll(elementId, backgroundWidth, backgroundHeight, scrollDirectionX, scrollDirectionY, maxOffsetX, maxOffsetY) {
  // Set optional params
  if (typeof scrollDirection == 'undefined') {
    scrollDirection = 'down';
  }

  if (typeof maxOffsetX == 'undefined') {
    maxOffsetX = 'auto';
  }
  else {
    maxOffsetX = maxOffsetX * -1;
  }

  if (typeof maxOffsetY == 'undefined') {
    maxOffsetY = 'auto';
  }
  else {
    maxOffsetY = maxOffsetY * -1;
  }


  // Setup variables
  var obj = document.getElementById(elementId),

  w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],

  windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight,
  windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,

  scrollTop = w.pageYOffset || e.scrollTop,
  scrollBottom = scrollTop + windowHeight,
  scrollLeft = w.pageXOffset || e.scrollLeft,
  scrollRight = scrollLeft + windowWidth,

  containerWidth = obj.offsetWidth,
  containerHeight = obj.offsetHeight,

  containerTop = obj.offsetTop,
  containerBottom = containerTop + containerHeight,
  containerLeft = obj.offsetLeft,
  containerRight = containerLeft + containerWidth;


  // Is this image using "cover"? Set the background to the right ratio.
  var style = w.getComputedStyle(obj),
      bgSize = style.getPropertyValue('background-size');

  if (bgSize=='cover') {
    // Get the ratio of the div & the image
    var imageRatio = backgroundWidth / backgroundHeight,
        coverRatio = containerWidth / containerHeight;

    // Work out which ratio is greater
    if (imageRatio >= coverRatio) {
      var coverHeight = containerHeight,
          scale = (coverHeight / backgroundHeight),
          coverWidth = backgroundWidth * scale;
    } else {
      var coverWidth = containerWidth,
          scale = (coverWidth / backgroundWidth),
          coverHeight = backgroundHeight * scale;
    }

    backgroundWidth = coverWidth;
    backgroundHeight = coverHeight;
  }


  // Calculate the HORIZONTAL background position
  var xPos = 0;
  if (scrollRight >= containerLeft && scrollLeft <= containerRight && (maxOffsetX > 0 || maxOffsetX == 'auto')) {
    var percentageOfTotalScroll = 100 - (((containerRight - scrollLeft) / containerRight) * 100);

    if (scrollDirectionX=='up') {
      percentageOfTotalScroll = 100 - percentageOfTotalScroll;
    }
    var totalOffset = containerWidth - backgroundWidth;
    if (maxOffsetX != 'auto' && totalOffset < maxOffset) {
      totalOffset = maxOffsetX;
    }
    xPos = totalOffset * (percentageOfTotalScroll / 100);
  }


  // Calculate the VERTICAL background position
  var yPos = 0;
  if (scrollBottom >= containerTop && scrollTop <= containerBottom && (maxOffsetY > 0 || maxOffsetY == 'auto')) {
    var percentageOfTotalScroll = 100 - (((containerBottom - scrollTop) / containerBottom) * 100);

    if (scrollDirectionY=='up') {
      percentageOfTotalScroll = 100 - percentageOfTotalScroll;
    }
    var totalOffset = containerHeight - backgroundHeight;
    if (maxOffsetY != 'auto' && totalOffset < maxOffset) {
      totalOffset = maxOffsetY;
    }
    yPos = totalOffset * (percentageOfTotalScroll / 100);
  }


  return [xPos, yPos];
}
