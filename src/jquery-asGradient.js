/*
 * jquery-asGradient
 * https://github.com/amazingSurge/jquery-asGradient
 *
 * Copyright (c) 2014 amazingSurge
 * Licensed under the GPL license.
 */
(function(window, document, $, Color, undefined) {
    'use strict';

    var CssColorStrings = {
        LINEAR: {
            match: /(?<prefix>-webkit-|-moz-|-ms-|-o-){0,1}(?<type>linear|radial|repeating-linear)-gradient\s*\((\s*(?<angle>[\w\s]+)\s*,){1}(?<stops>(\s*(#[a-z0-9]{1,6}|\w+\s*(\s*\([\d,\s%]+\)){0,1})( [\s\d%]+){0,1},{0,1})+)\s*\)/i,
            parse: function(result) {
                return {
                    r: (result[1].substr(-1) === '%') ? parseInt(result[1].slice(0, -1) * 2.55, 10) : parseInt(result[1], 10),
                    g: (result[2].substr(-1) === '%') ? parseInt(result[2].slice(0, -1) * 2.55, 10) : parseInt(result[2], 10),
                    b: (result[3].substr(-1) === '%') ? parseInt(result[3].slice(0, -1) * 2.55, 10) : parseInt(result[3], 10),
                    a: 1
                };
            },
            to: function(color) {
                return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
            }
        }
        // RADIAL: {
        //     match: /rgba\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d?(?:\.\d+)?)\s*\)/i,
        //     parse: function(result) {
        //         return {
        //             r: (result[1].substr(-1) === '%') ? parseInt(result[1].slice(0, -1) * 2.55, 10) : parseInt(result[1], 10),
        //             g: (result[2].substr(-1) === '%') ? parseInt(result[2].slice(0, -1) * 2.55, 10) : parseInt(result[2], 10),
        //             b: (result[3].substr(-1) === '%') ? parseInt(result[3].slice(0, -1) * 2.55, 10) : parseInt(result[3], 10),
        //             a: parseFloat(result[4])
        //         };
        //     },
        //     to: function(color) {
        //         return 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';
        //     }
        // }
    };

    var angleDirectionMapping = {
        'top'          : 0,
        'right'        : 90,
        'bottom'       : 180,
        'left'         : 270,
        'top right'    : 45,
        'right top'    : 45,
        'right bottom' : 135,
        'bottom right' : 135,
        'bottom left'  : 225,
        'left bottom'  : 225,
        'left top'     : 315,
        'top left'     : 315
    };

    function isPercentage() {

    }

    function isLength(){

    }

    var Gradient = $.asGradient = function(string, type) {
        this.value = {
            angle: 0,
            stops: []
        };

        this.type = 'LINEAR';
        this.length = this.value.stops.length;
        this.current = 0;

        this.init(string, type);
    };

    Gradient.prototype = {
        constructor: Gradient,
        init: function(string, type) {
            if (typeof type !== 'undefined') {
                this.type(type);
            } else {
                // for (var i in CssColorStrings) {
                //     var matched = null;
                //     if ((matched = CssColorStrings[i].match.exec(string)) != null) {
                //         this.type(i);
                //         break;
                //     }
                // }
            }
            this.fromString(string);
        },
        val: function(value) {
            if (typeof value === 'undefined') {
                return this.toString();
            } else {
                this.fromString(value);
                return this;
            }
        },
        angle: function(value) {
            if (typeof value === 'undefined') {
                return this.value.angle;
            } else if(typeof value === 'string' && angleDirectionMapping.hasOwnProperty(value)){
                this.value.angle = angleDirectionMapping[value];
            } else {
                value = parseInt(value, 10);

                if (value > 360) {
                    value = value % 360;
                } else if (value < 0) {
                    value = value % -360;

                    if(value !== 0) {
                        value = 360 + value;
                    }
                }
                this.value.angle = value;
            }
        },
        append: function(color, position){
            this.insert(color, position, this.length);
        },
        insert: function(color, position, index) {
            if(typeof index === 'undefined') {
                index = this.current;
            }

            var stop = {
                color: new Color(color),
                position: position
            };
            
            this.value.stops.splice(index, 0, stop);
            
            this.length = this.length + 1;
            this.current = index;

        },
        get: function(index) {
            if(typeof index === 'undefined') {
                index = this.current;
            }
            if(index >= 0 && index < this.length) {
                this.current = index;
                return this.value.stops[index];
            } else {
                return false;
            }
        },
        remove: function(index) {
            if(typeof index === 'undefined') {
                index = this.current;
            }
            if(index >= 0 && index < this.length) {
                this.value.stops.splice(index, 1);
                this.length = this.length - 1;
                this.current = index - 1;
            }
        },
        empty: function() {
            this.value.stops = [];
            this.length = 0;
            this.current = 0;
        },
        reset: function() {
            this.angle(0);
            this.empty();
        },
        type: function(type) {
            if (typeof type === 'string' && (type = type.toUpperCase()) && typeof CssColorStrings[type] !== 'undefined') {
                this.type = type;
            } else {
                return this.type;
            }
        },
        fromString: function(string) {
            if (typeof string === 'string') {
                // var matched = null;
                // for (var i in CssColorStrings) {
                //     if ((matched = CssColorStrings[i].match.exec(string)) != null) {
                //         this.set(CssColorStrings[i].parse(matched));
                //         break;
                //     }
                // }
            } else if (typeof string === 'object') {
                // this.set(string);
            }
        },
        toString: function() {
            return CssColorStrings[this.type()].to(this.value);
        }
    };
    Gradient.HSLToRGB = function(hsl) {
        var h = hsl.h / 360,
            s = hsl.s,
            l = hsl.l,
            m1, m2, rgb;
        if (l <= 0.5) {
            m2 = l * (s + 1);
        } else {
            m2 = l + s - (l * s);
        }
        m1 = l * 2 - m2;
        rgb = {
            r: Gradient.hueToRGB(m1, m2, h + 1 / 3),
            g: Gradient.hueToRGB(m1, m2, h),
            b: Gradient.hueToRGB(m1, m2, h - 1 / 3)
        };
        if (typeof hsl.a !== 'undefined') {
            rgb.a = hsl.a;
        }
        if (hsl.l === 0) {
            rgb.h = hsl.h;
        }
        return rgb;
    };
}(window, document, jQuery, (function($) {
    if ($.asColor === undefined) {
        // console.info('lost dependency lib of $.asColor , please load it first !');
        return false;
    } else {
        return $.asColor;
    }
}(jQuery))));
