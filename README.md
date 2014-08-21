# asGradient

A jquery plugin used to manipulate css image gradient. You can add a new color stop. Change the position of color stop. Or remove a color stop. In the end, it can output a formated standard css gradient string. 

It depend on [jQuery asColor](https://github.com/amazingSurge/jquery-asColor) plugin.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/amazingSurge/jquery-asGradient/master/dist/jquery-asGradient.min.js
[max]: https://raw.github.com/amazingSurge/jquery-asGradient/master/dist/jquery-asGradient.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery-asColor.min.js"></script>
<script src="dist/jquery-asGradient.min.js"></script>
<script>
jQuery(function($) {
    var gradient = new $.asGradient('-webkit-linear-gradient(left, #ace, #fff9a6 5%, #ace, #f96 95%, #ace)', {
        forceStandard: true,
        angleUseKeyword: true,
        emptyString: '',
        degradationFormat: 'rgba',
        cleanPosition: true,
        forceColorFormat: false, // rgb, rgba, hsl, hsla, hex
        color: {
            hexUseName: false,
            reduceAlpha: true,
            shortenHex: true,
            zeroAlphaAsTransparent: false,
            invalidValue: {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            }
        }
    });

    console.info(gradient.toString());
});
</script>
```

## Credits
- [CSS Image Values and Replaced Content Module Level 3](http://dev.w3.org/csswg/css-images-3/#linear-gradients)
