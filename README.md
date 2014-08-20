# asGradient

A jquery plugin used to parse css color string and convent it to other color formats. It support rgb, rgba, hex, hsl, hsla.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/amazingSurge/jquery-asGradient/master/dist/jquery-asGradient.min.js
[max]: https://raw.github.com/amazingSurge/jquery-asGradient/master/dist/jquery-asGradient.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery-asGradient.min.js"></script>
<script>
jQuery(function($) {
  var gradient = $.asGradient('-webkit-linear-gradient(left, #ace, #f96 5%, #ace, #f96 95%, #ace)');

  console.dir(gradient);
});
</script>
```
