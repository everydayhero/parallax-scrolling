(function() {
  var Parallax = window.Parallax = (function() {

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
        return false;
      }

      // Set optional params
      var scrollDir = scrollDir || 'down';
      var maxOffset = (maxOffset * -1) || 'auto';

      // Setup state variables
      var el = document.getElementById(id);
      var w = window;
      var d = document;
      var e = d.documentElement;
      var g = d.getElementsByTagName('body')[0]; // For older browsers

      // Add variables to state
      state = {
        'el': el,
        'w': w,
        'd': d,
        'e': e,
        'g': g
      };

      // Create the background image
      var backgroundImg = new Image();
      backgroundImg.src = src;

      // Once it's loaded
      backgroundImg.onload = function() {
        // Set width and height
        backgroundWidth = backgroundImg.width;
        backgroundHeight = backgroundImg.height;

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
        return Parallax.resize();
      }

      initialised = true;
    };
  });



  Parallax.prototype.scroll = function() {
    // If the images aren't loaded yet, the args var won't be set so return false
    if (Object.keys(args).length==0) {
      return false;
    } else {
      // Setup state variables
      var scrollTop = w.pageYOffset || e.scrollTop;
      var scrollBottom = scrollTop + windowHeight;
      var containerWidth = obj.offsetWidth;
      var containerHeight = obj.offsetHeight;
      var containerTop = obj.offsetTop;
      var containerBottom = containerTop + containerHeight;

      // Add variables to state
      state.scrollTop = scrollTop;
      state.scrollBottom = scrollBottom;
      state.containerWidth = containerWidth;
      state.containerHeight = containerHeight;
      state.containerTop = containerTop;
      state.containerBottom = containerBottom;

      // Calculate the VERTICAL background position
      var yPos = 0;
      if (state.scrollBottom >= state.containerTop && state.scrollTop <= state.containerBottom && (params.maxOffset != 0 || params.maxOffset == 'auto')) {
        var percentageOfTotalScroll = 100 - (((state.containerBottom - state.scrollTop) / state.containerBottom) * 100);

        if (params.scrollDirectionY=='up') {
          percentageOfTotalScroll = 100 - percentageOfTotalScroll;
        }
        var totalOffset = state.containerHeight - params.backgroundHeight;
        if (params.maxOffset != 'auto' && totalOffset < params.maxOffset) {
          totalOffset = params.maxOffsetY;
        }
        yPos = totalOffset * (percentageOfTotalScroll / 100);
      }

      return yPos;
    }
  };



  Parallax.prototype.resize = function() {
    // If the images aren't loaded yet, the args var won't be set so return false
    if (Object.keys(args).length==0) {
      return false;
    } else {
      // Setup state variables
      var windowHeight = state.w.innerHeight || state.e.clientHeight || state.g.clientHeight;
      var windowWidth = state.w.innerWidth || state.e.clientWidth || state.g.clientWidth;

      // Is this image using "cover"? Set the background to the right ratio.
      var style = state.w.getComputedStyle(state.el);
      var bgSize = style.getPropertyValue('background-size');

      if (bgSize=='cover') {
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

      // Add variables to state
      state.windowHeight = windowHeight;
      state.windowWidth = windowWidth;

      // Call scroll function
      return Parallax.scroll();
    }
  };

  return Parallax;
})();
