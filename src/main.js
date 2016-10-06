import $ from 'jquery';
import AsGradient from './asGradient';
import info from './info';

const OtherAsGradient = $.asGradient;

const jQueryAsGradient = function(...args) {
  return new AsGradient(...args);
}

$.asGradient = jQueryAsGradient;
$.asGradient.Constructor = AsGradient;

$.extend($.asGradient, {
  noConflict: function() {
    $.asGradient = OtherAsGradient;
    return jQueryAsGradient;
  }
}, info);

export default $.asGradient;
