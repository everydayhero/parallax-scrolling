(function() {
  var Parallax = window.Parallax = (function() {

    var self = this;
    var params = {};
    var state = {};

    var initialised = false;

    // Init function
    // ------------------------------------------------
    // id (str): Required. ID of DOM element.
    // src (str): Required. Source of background image.
    // scrollDir (str): Optional. Scroll direction can be either "down" or "up". Default is "down".
    // maxOffset (int): Optional. Max number of pixels the background can move vertically. By default it will use all available overflowing pixels.
    this.init = function(id, src, scrollDir, maxOffset) {

      // Make sure it only fires once
      if (initialised) {
        return;
      }

      // Set optional params
      scrollDir = scrollDir || 'down';
      maxOffset = (maxOffset * -1) || 'auto';

      // Add variables to state
      state.el = document.getElementById(id);
      state.w = window;
      state.d = document;
      state.e = state.d.documentElement;
      state.g = state.d.getElementsByTagName('body')[0]; // For older browsers

      // Create the background image
      var backgroundImg = new Image();
      backgroundImg.src = src;

      // Once it's loaded
      backgroundImg.onload = function() {
        // Set width and height
        var backgroundWidth = backgroundImg.width;
        var backgroundHeight = backgroundImg.height;

        // Apply image to DOM element
        state.el.style.backgroundImage = "url('"+src+"')";

        // Add variables to state
        state.backgroundWidth = backgroundWidth;
        state.backgroundHeight = backgroundHeight;

        // Add variables to params
        params = {
          'id': id,
          'scrollDir': scrollDir,
          'maxOffset': maxOffset
        };

        // Trigger the resize to set all state vars (resize also calls scroll)
        self.resize();

        // Trigger the load function
        window.parallaxLoad();
      }

      initialised = true;
    };



    this.scroll = function() {
      // Make sure the init function has fired
      if (!initialised) {
        return;
      }

      // Setup state variables
      var scrollTop = state.w.pageYOffset || state.e.scrollTop;
      var scrollBottom = state.scrollTop + state.windowHeight;

      // Add variables to state
      state.scrollTop = scrollTop;
      state.scrollBottom = scrollBottom;

      // Calculate the VERTICAL background position
      var yPos = 0;
      if (state.scrollBottom >= state.containerTop && state.scrollTop <= state.containerBottom && (params.maxOffset != 0 || params.maxOffset === 'auto')) {
        var percentageOfTotalScroll = 100 - (((state.containerBottom - state.scrollTop) / state.containerBottom) * 100);

        if (params.scrollDir === 'up') {
          percentageOfTotalScroll = 100 - percentageOfTotalScroll;
        }
        var totalOffset = state.containerHeight - state.backgroundHeight;
        if (params.maxOffset != 'auto' && totalOffset < params.maxOffset) {
          totalOffset = params.maxOffset;
        }

        yPos = totalOffset * (percentageOfTotalScroll / 100);
      }

      return yPos;
    };



    this.resize = function() {
      // Make sure the init function has fired
      if (!initialised) {
        return;
      }

      // Add variables to state
      state.windowHeight = state.w.innerHeight || state.e.clientHeight || state.g.clientHeight;
      state.windowWidth = state.w.innerWidth || state.e.clientWidth || state.g.clientWidth;
      state.containerWidth = state.el.offsetWidth;
      state.containerHeight = state.el.offsetHeight;
      state.containerTop = state.el.offsetTop;
      state.containerBottom = state.containerTop + state.containerHeight;

      // Is this image using "cover"? Set the background to the right ratio.
      var style = state.w.getComputedStyle(state.el);
      var bgSize = style.getPropertyValue('background-size');

      if (bgSize === 'cover') {
        // Get the ratio of the div & the image
        var imageRatio = state.backgroundWidth / state.backgroundHeight;
        var coverRatio = state.containerWidth / state.containerHeight;

        // Work out which ratio is greater
        if (imageRatio >= coverRatio) {
          var coverHeight = state.containerHeight;
          var scale = (coverHeight / state.backgroundHeight);
          var coverWidth = state.backgroundWidth * scale;
        } else {
          var coverWidth = state.containerWidth;
          var scale = (coverWidth / state.backgroundWidth);
          var coverHeight = state.backgroundHeight * scale;
        }

        // Add variables to state
        state.backgroundWidth = coverWidth;
        state.backgroundHeight = coverHeight;
      }


      // Call scroll function
      return self.scroll();
    };


  });

})();



// Legacy browser support for requestAnimationFrame (IE8 & IE9)
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());



// Legacy browser support for getComputedStyle (IE8)
if (!window.getComputedStyle) {
  window.getComputedStyle = function(el, pseudo) {
    this.el = el;
    this.getPropertyValue = function(prop) {
      var re = /(\-([a-z]){1})/g;
      if (prop == 'float') prop = 'styleFloat';
      if (re.test(prop)) {
        prop = prop.replace(re, function () {
          return arguments[2].toUpperCase();
        });
      }
      return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }
    return this;
  }
}
