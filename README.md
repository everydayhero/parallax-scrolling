# Parallax-Scrolling
Vanilla JS parallax scrolling function for CSS backgrounds. Will scroll a background applied to a div.


## Version:
1.0


## Params:
```
- elementId (str): The element's ID.
- backgroundWidth (int): Background image's width in pixels.
- backgroundHeight (int): Background image's height in pixels.
- scrollDirectionX (str): Optional. Set to either "left" or "right" to specify horizontal scroll direction.
- scrollDirectionY (str): Optional. Set to either "up" or "down" to specify vertical scroll direction.
- maxOffsetX (int): Optional. Max number of pixels the background can move horizontally. Set this to 0 to disable horizontal scrolling.
- maxOffsetY (int): Optional. Max number of pixels the background can move vertically. Set this to 0 to disable vertical scrolling.
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
  background: url('img/example.jpg') no-repeat;
  background-size: cover; /* This property is supported. Sick lad. */

  width: 1024px;
  height: 400px;
}
```

JS (add this as the last thing on the page)
```
function doParallax() {
  var pos = parallaxScroll('header', 1024, 768);
  document.getElementById('header').style.backgroundPosition = (pos[0]+'px '+pos[1]+'px');
}

doParallax();
window.onscroll = doParallax;
window.onresize = doParallax;
```
