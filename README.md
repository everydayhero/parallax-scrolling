# Parallax-Scrolling
Pure JS parallax scrolling function for CSS backgrounds. Will scroll a background applied to a div. By default, it uses the maximum amount of overflowing pixels and evenly distrubutes them across the entire scroll duration (defined by when the containing div is in the viewport).


## Demo:
Download and view the example or visit http://d2h3g7rbnequ8a.cloudfront.net/parallax-scrolling/example.html


## Version:
1.0


## Params:
```
- id (str): Required. ID of DOM element.
- src (str): Required. Source of background image.
- scrollDir (str): Optional. Scroll direction can be either "down" or "up". Default is "down".
- maxOffset (int): Optional. Max number of pixels the background can move vertically. By default it will use all available overflowing pixels.
```


## Browser Support:
IE9+, Chrome, Firefox, Safari, Opera
(Should support IE8 as well, but this is untested)


## Known Bugs:
The scroll event on mobile only returns after it stops scrolling. Possible fix: https://filipbech.github.io/2013/07/smooth-parallax-scrolling-on-ios-with/


## Example Usage:
HTML
```
<script src="parallaxScrolling-1.0.min.js"></script>
<div id="banner"></div>
```

CSS
```
#banner {
  /* This property is supported if you want to use it. Sick lad. */
  background-size: cover;

  /* Set width and height of container to whatever you want. Percentages are supported. */
  width: 100%;
  height: 400px;

  /* You can also add a subtle transition for extra awesome */
  transition: background-position 0.05s linear;
}
```

JS
```
// JS Example
// -------------------------------------------------------------
// Config
var id = "banner"; // (str): Required. ID of DOM element.
var src = banner.jpg; // (str): Required. Source of background image.
var scrollDir = "down"; // (str): Optional. Scroll direction can be either "down" or "up". Default is "down".
var maxOffset = "auto"; // (int): Optional. Max number of pixels the background can move vertically. By default it will use all available overflowing pixels.
var interval = 100; // (int): Set how often the background position is calculated and applied to the DOM in milliseconds

// Init
var parallax = new Parallax();
parallax.init(id, src, scrollDir, maxOffset);
var el = document.getElementById(id);

// Event listeners
function parallaxLoad() {
  el.style.backgroundPosition = ('0 '+parallax.scroll()+'px');
}

var parallaxScrollEnabled = true;
window.addEventListener('scroll', function() {
  if (!parallaxScrollEnabled) { return; }

  parallaxScrollEnabled = false;
  el.style.backgroundPosition = ('0 '+parallax.scroll()+'px');

  return setTimeout((function() { parallaxScrollEnabled = true; }), interval);
});

var parallaxResizeEnabled = true;
window.addEventListener('resize', function() {
  if (!parallaxResizeEnabled) { return; }

  parallaxResizeEnabled = false;
  el.style.backgroundPosition = ('0 '+parallax.resize()+'px');

  return setTimeout((function() { parallaxResizeEnabled = true; }), interval);
});



// jQuery Example
// -------------------------------------------------------------
// Config
var id = "banner"; // (str): Required. ID of DOM element.
var src = banner.jpg; // (str): Required. Source of background image.
var scrollDir = "down"; // (str): Optional. Scroll direction can be either "down" or "up". Default is "down".
var maxOffset = "auto"; // (int): Optional. Max number of pixels the background can move vertically. By default it will use all available overflowing pixels.
var interval = 100; // (int): Set how often the background position is calculated and applied to the DOM in milliseconds

// Init
var parallax = new Parallax();
parallax.init(id, src, scrollDir, maxOffset);

// Event listeners
function parallaxLoad() {
  $('#'+id).css('backgroundPosition', ('0 '+parallaxHeader.scroll()+'px'));
}

var parallaxScrollEnabled = true;
$(window).scroll(function() {
  if (!parallaxScrollEnabled) { return; }

  parallaxScrollEnabled = false;
  $('#'+id).css('backgroundPosition', ('0 '+parallaxHeader.scroll()+'px'));

  return setTimeout((function() { parallaxScrollEnabled = true; }), interval);
});

var parallaxResizeEnabled = true;
$(window).resize(function() {
  if (!parallaxResizeEnabled) { return; }

  parallaxResizeEnabled = false;
  $('#'+id).css('backgroundPosition', ('0 '+parallaxHeader.resize()+'px'));

  return setTimeout((function() { parallaxResizeEnabled = true; }), interval);
});
```
