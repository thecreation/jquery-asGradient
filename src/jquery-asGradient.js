/*
 * jquery-asGradient
 * https://github.com/amazingSurge/jquery-asGradient
 *
 * Copyright (c) 2014 amazingSurge
 * Licensed under the GPL license.
 */
(function(window, document, $, Color, undefined) {
    'use strict';

    var RegExpStrings = (function(){
        var color = /(?:rgba|rgb|hsla|hsl)\s*\([\s\d,%]+\)|#[a-z0-9]{3,6}|[a-z]+/i,
            position = /\d{1,3}%/i,
            angle = /(?:to ){0,1}(?:(?:top|left|right|bottom)\s*){1,2}|\d+deg/i,
            stop = new RegExp('(' + color.source + ')\\s*(' + position.source + '){0,1}', 'i'),
            stops = new RegExp(stop.source, 'gi'),
            parameters = new RegExp('(?:('+ angle.source +'),){0,1}\\s*(.+)\\s*', 'i');

        return {
            FULL: /(-webkit-|-moz-|-ms-|-o-){0,1}(linear|radial|repeating-linear)-gradient\s*\(\s*(.+)\s*\)/i,
            ANGLE: angle,
            COLOR: color,
            POSITION: position,
            STOP: stop,
            STOPS: stops,
            PARAMETERS: parameters
        };
    })(),
    GradientTypes = {
        LINEAR: {
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
    },
    angleDirectionMapping = {
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

    var Gradient = $.asGradient = function(string) {
        this.value = {
            angle: 0,
            stops: []
        };

        this._type = 'LINEAR';
        this._prefix = null;
        this.length = this.value.stops.length;
        this.current = 0;

        this.init(string);
    };

    Gradient.prototype = {
        constructor: Gradient,
        init: function(string) {
            if(string){
                this.fromString(string);
            }
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
            } else {
                this.value.angle = Gradient.parseAngle(value);
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
            this._prefix = null;
            this._type = 'LINEAR';
        },
        type: function(type) {
            if (typeof type === 'string' && (type = type.toUpperCase()) && typeof GradientTypes[type] !== 'undefined') {
                this._type = type;
            } else {
                return this._type;
            }
        },
        fromString: function(string) {
            this.reset();

            var result = Gradient.parseString(string);
            if(result) {
                this._prefix = result.prefix;
                this.type(result.type);
                if(result.value){
                    this.angle(result.value.angle);
                    var self = this;
                    $.each(result.value.stops, function(i, stop) {
                        self.append(stop.color, stop.position);
                    });
                }
            }
        },
        toString: function() {
            return GradientTypes[this.type()].to(this.value);
        }
    };
    Gradient.parseString = function(string) {
        var matched, parameters;
        if ((matched = RegExpStrings.FULL.exec(string)) != null) {
            return {
                prefix: (typeof matched[1] === 'undefined') ? null: matched[1],
                type: matched[2],
                value: Gradient.parseParameters(matched[3])
            };
        } else {
            return false;
        }
    };
    Gradient.parseParameters = function(string) {
        var matched;
        if ((matched = RegExpStrings.PARAMETERS.exec(string)) != null) {
            return {
                angle: (typeof matched[1] === 'undefined') ? 0: matched[1],
                stops: Gradient.parseStops(matched[2])
            };
        } else {
            return false;
        }
    };
    Gradient.parseStops = function(string) {
        var matched, result = [];
        if ((matched = string.match(RegExpStrings.STOPS)) != null) {
            
            $.each(matched, function(i, item){
                var stop = Gradient.parseStop(item);
                if(stop) {
                    result.push(stop);
                }
            });
            return result;
        } else {
            return false;
        }
    };
    Gradient.parseStop = function(string) {
        var matched;
        if ((matched = RegExpStrings.STOP.exec(string)) != null) {
            var position;
            if(typeof matched[2] !== 'undefined' && matched[2].substr(-1) === '%'){
                position = parseFloat(matched[2].slice(0, -1) / 100)
            }
            return {
                color: matched[1],
                position: position
            };
        } else {
            return false;
        }
    };
    Gradient.parseAngle = function(string) {
        if(typeof string === 'string'){
            if(string.indexOf("to ") === 0){
                string = $.trim(string.substr(3));

            }
            if(angleDirectionMapping.hasOwnProperty(string)){
                string = angleDirectionMapping[string];
            }
        }

        var value = parseInt(string, 10);

        if (value > 360) {
            value = value % 360;
        } else if (value < 0) {
            value = value % -360;

            if(value !== 0) {
                value = 360 + value;
            }
        }
        return value;
    };
}(window, document, jQuery, (function($) {
    if ($.asColor === undefined) {
        // console.info('lost dependency lib of $.asColor , please load it first !');
        return false;
    } else {
        return $.asColor;
    }
}(jQuery))));
