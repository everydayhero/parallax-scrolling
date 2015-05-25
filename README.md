# Parallax-Scrolling
Vanilla JS parallax scrolling function for CSS backgrounds. Will scroll a background applied to a div. By default, it uses the maximum amount of overflowing pixels and evenly distrubutes them across the entire scroll duration (defined by when the containing div is in the viewport).


## Version:
1.0


## Params:
```
- elementId (str): The element's ID.
- background (str): Path to the background image.
- scrollDirectionX (str): Optional. Set to either "left" or "right" to specify horizontal scroll direction.
- scrollDirectionY (str): Optional. Set to either "up" or "down" to specify vertical scroll direction.
- maxOffsetX (int): Optional. Max number of pixels the background can move horizontally. By default it will use all available overflowing pixels. Set this to 0 to disable horizontal scrolling.
- maxOffsetY (int): Optional. Max number of pixels the background can move vertically. By default it will use all available overflowing pixels. Set this to 0 to disable vertical scrolling.
```


## Browser Support:
IE9+, Chrome, Firefox, Safari, Opera
(Should support IE8 as well, but this is untested)


## Known Bugs:
The scroll event on mobile only returns after it stops scrolling. Possible fix: https://filipbech.github.io/2013/07/smooth-parallax-scrolling-on-ios-with/


## Example Usage:
HTML
```
<div id="header"></div>
```

CSS
```
#header {
  background-size: cover; /* This property is supported. Sick lad. */

  width: 1024px;
  height: 400px;
}
```

JS (add this as the last thing on the page)
```
var parallaxArgs = []; // Required global variable
parallaxInit('header', 'img/banner.jpg');


function doParallax() {
  parallaxScroll('header');
}
window.onscroll = doParallax;
window.onresize = doParallax;
```
