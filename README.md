# asColor

A jquery plugin used to parse css color string and convent it to other color formats. It support rgb, rgba, hex, hsl, hsla.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/amazingSurge/jquery-asColor/master/dist/jquery-asColor.min.js
[max]: https://raw.github.com/amazingSurge/jquery-asColor/master/dist/jquery-asColor.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery-asColor.min.js"></script>
<script>
jQuery(function($) {
  var color = $.asColor('rgba(255, 255, 255, 1)'),
  string = color.toString(), // rgba(255, 255, 255, 1)
  hex = color.toHEX(), // #ffffff
  rgb = color.toRGB(), // rgb(255, 255, 255)
  hsl = color.toHSL(), // hsl(0, 0%, 100%)
  hsla = color.toHSLA(); // hsla(0, 0%, 100%, 1)

  color.val('#000')
  color.format('hsla');
  color.alpha(0.5);
  var value = color.val(); // hsla(0, 0%, 0%, 0.5)
});
</script>
```
