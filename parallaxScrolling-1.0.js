function parallaxInit(elementId, background, scrollDirectionX, scrollDirectionY, maxOffsetX, maxOffsetY) {
  // Set optional params
  if (typeof scrollDirectionX == 'undefined') {
    scrollDirectionX = 'right';
  }
  if (typeof scrollDirectionY == 'undefined') {
    scrollDirectionY = 'down';
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

  containerWidth = obj.offsetWidth,
  containerHeight = obj.offsetHeight;


  // Create the background image
  var backgroundImg = new Image();
  backgroundImg.src = background;

  // Once it's loaded
  backgroundImg.onload = function() {
    // Set width and height
    backgroundWidth = backgroundImg.width;
    backgroundHeight = backgroundImg.height;

    // Apply to div
    obj.style.backgroundImage = "url('"+background+"')";

    // Output arguments to global variable
    parallaxArgs[elementId] = [];
    parallaxArgs[elementId]['backgroundWidth'] = backgroundWidth;
    parallaxArgs[elementId]['backgroundHeight'] = backgroundHeight;
    parallaxArgs[elementId]['scrollDirectionX'] = scrollDirectionX;
    parallaxArgs[elementId]['scrollDirectionY'] = scrollDirectionY;
    parallaxArgs[elementId]['maxOffsetX'] = maxOffsetX;
    parallaxArgs[elementId]['maxOffsetY'] = maxOffsetY;
  }

}



function parallaxScroll(elementId) {
  // Setup variables
  var paramsArr = parallaxArgs[elementId];

  // If the images aren't loaded yet, the global vars won't be set
  if (typeof paramsArr == 'undefined') {
    return false;
  }

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
  var style = window.getComputedStyle(obj),
      bgSize = style.getPropertyValue('background-size');

  if (bgSize=='cover') {
    // Get the ratio of the div & the image
    var imageRatio = paramsArr['backgroundWidth'] / paramsArr['backgroundHeight'],
        coverRatio = containerWidth / containerHeight;

    // Work out which ratio is greater
    if (imageRatio >= coverRatio) {
      var coverHeight = containerHeight,
          scale = (coverHeight / paramsArr['backgroundHeight']),
          coverWidth = paramsArr['backgroundWidth'] * scale;
    } else {
      var coverWidth = containerWidth,
          scale = (coverWidth / paramsArr['backgroundWidth']),
          coverHeight = paramsArr['backgroundHeight'] * scale;
    }

    paramsArr['backgroundWidth'] = coverWidth;
    paramsArr['backgroundHeight'] = coverHeight;
  }


  // Calculate the HORIZONTAL background position
  var xPos = 0;
  if (scrollRight >= containerLeft && scrollLeft <= containerRight && (paramsArr['maxOffsetX'] != 0 || paramsArr['maxOffsetX'] == 'auto')) {
    var percentageOfTotalScroll = 100 - (((containerRight - scrollLeft) / containerRight) * 100);

    if (paramsArr['scrollDirectionX'] == 'up') {
      percentageOfTotalScroll = 100 - percentageOfTotalScroll;
    }
    var totalOffset = containerWidth - paramsArr['backgroundWidth'];
    if (paramsArr['maxOffsetX'] != 'auto' && totalOffset < paramsArr['maxOffsetX']) {
      totalOffset = paramsArr['maxOffsetX'];
    }
    xPos = totalOffset * (percentageOfTotalScroll / 100);
  }


  // Calculate the VERTICAL background position
  var yPos = 0;
  if (scrollBottom >= containerTop && scrollTop <= containerBottom && (paramsArr['maxOffsetY'] != 0 || paramsArr['maxOffsetY'] == 'auto')) {
    var percentageOfTotalScroll = 100 - (((containerBottom - scrollTop) / containerBottom) * 100);

    if (paramsArr['scrollDirectionY']=='up') {
      percentageOfTotalScroll = 100 - percentageOfTotalScroll;
    }
    var totalOffset = containerHeight - paramsArr['backgroundHeight'];
    if (paramsArr['maxOffsetY'] != 'auto' && totalOffset < paramsArr['maxOffsetY']) {
      totalOffset = paramsArr['maxOffsetY'];
    }
    yPos = totalOffset * (percentageOfTotalScroll / 100);
  }


  return [xPos, yPos];
}
