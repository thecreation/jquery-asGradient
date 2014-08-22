(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
     (value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
      */
    module('asGradient', {
        // This will run before each test in this module.
        setup: function() {
            this.gradient = new $.asGradient({
                forceStandard: true,
                angleUseKeyword: true,
                emptyString: '',
                degradationFormat: 'rgba',
                cleanPosition: true,
                color: {
                    format: 'rgba',
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
        },
        teardown: function() {
            this.gradient.empty();
        }
    });
    
    test('init', function(){
        equal(this.gradient.length, 0, 'test length first');

        this.gradient.append('#fff');
        equal(this.gradient.length, 1, 'test length after append');

        equal(this.gradient.get().color.toString(), '#fff', 'get the first stop');

        this.gradient.append('rgba(255, 255, 255, 0.7)');
        equal(this.gradient.length, 2,'test length after the second append');

        equal(this.gradient.get(1).color.toString(), 'rgba(255, 255, 255, 0.7)', 'get the second stop');

        this.gradient.remove(1);
        equal(this.gradient.length, 1, 'test length after remove');
    });

    test('angle standare and prefixed', function(){
        this.gradient.fromString('-webkit-linear-gradient(top, #000000, #ffffff)');
        equal(this.gradient.angle(), 180, 'test old top');

        this.gradient.fromString('-webkit-linear-gradient(right, #000000, #ffffff)');
        equal(this.gradient.angle(), 270, 'test old right');

        this.gradient.fromString('-webkit-linear-gradient(bottom, #000000, #ffffff)');
        equal(this.gradient.angle(), 0, 'test old bottom');

        this.gradient.fromString('-webkit-linear-gradient(left, #000000, #ffffff)');
        equal(this.gradient.angle(), 90, 'test old left');


        this.gradient.fromString('linear-gradient(to top, #000000, #ffffff)');
        equal(this.gradient.angle(), 0, 'test standare to top');

        this.gradient.fromString('linear-gradient(to right, #000000, #ffffff)');
        equal(this.gradient.angle(), 90, 'test standare to right');

        this.gradient.fromString('linear-gradient(to bottom, #000000, #ffffff)');
        equal(this.gradient.angle(), 180, 'test standare to bottom');

        this.gradient.fromString('linear-gradient(to left, #000000, #ffffff)');
        equal(this.gradient.angle(), 270, 'test standare to left');

        // if not standare angle
        this.gradient.fromString('linear-gradient(top, #000000, #ffffff)');
        equal(this.gradient.angle(), 180, 'test standare top');

        this.gradient.fromString('linear-gradient(right, #000000, #ffffff)');
        equal(this.gradient.angle(), 270, 'test standare right');

        this.gradient.fromString('linear-gradient(bottom, #000000, #ffffff)');
        equal(this.gradient.angle(), 0, 'test standare bottom');

        this.gradient.fromString('linear-gradient(left, #000000, #ffffff)');
        equal(this.gradient.angle(), 90, 'test standare left');


        this.gradient.fromString('linear-gradient(to top right, #000000, #ffffff)');
        equal(this.gradient.angle(), 45, 'test standare to top right');

        this.gradient.fromString('linear-gradient(to right bottom, #000000, #ffffff)');
        equal(this.gradient.angle(), 135, 'test standare to right bottom');

        this.gradient.fromString('linear-gradient(to bottom left, #000000, #ffffff)');
        equal(this.gradient.angle(), 225, 'test standare to bottom left');

        this.gradient.fromString('linear-gradient(to left top, #000000, #ffffff)');
        equal(this.gradient.angle(), 315, 'test standare to left top');

        this.gradient.fromString('-webkit-linear-gradient(top right, #000000, #ffffff)');
        equal(this.gradient.angle(), 225, 'test old top right');

        this.gradient.fromString('-webkit-linear-gradient(right bottom, #000000, #ffffff)');
        equal(this.gradient.angle(), 315, 'test old right bottom');

        this.gradient.fromString('-webkit-linear-gradient(bottom left, #000000, #ffffff)');
        equal(this.gradient.angle(), 45, 'test old bottom left');

        this.gradient.fromString('-webkit-linear-gradient(left top, #000000, #ffffff)');
        equal(this.gradient.angle(), 135, 'test old left top');

        this.gradient.fromString('-webkit-linear-gradient(90deg, #000000, #ffffff)');
        equal(this.gradient.angle(), 0, 'test old 90deg');

        this.gradient.fromString('linear-gradient(90deg, #000000, #ffffff)');
        equal(this.gradient.angle(), 90, 'test 90deg');
    });

    test('angle', function() {
        this.gradient.reset();

        equal(this.gradient.angle(), 0, 'test angle after reset');

        this.gradient.angle(360);
        equal(this.gradient.angle(), 360, 'test angle after set 360');

        this.gradient.angle(0);
        equal(this.gradient.angle(), 0, 'test angle after set 0');

        this.gradient.angle('25');
        strictEqual(this.gradient.angle(), 25, 'test angle after set "25"');

        this.gradient.angle(361);
        equal(this.gradient.angle(), 1, 'test angle after set "361"');

        this.gradient.angle(-1);
        equal(this.gradient.angle(), 359, 'test angle after set -1');

        this.gradient.angle(-360);
        equal(this.gradient.angle(), 0, 'test angle after set -360');

        this.gradient.angle(-361);
        equal(this.gradient.angle(), 359, 'test angle after set -361');
    });

    test('angle keyword', function() {
        this.gradient.reset();

        this.gradient.angle('to top');
        equal(this.gradient.angle(), 0, 'test angle to top');

        this.gradient.angle('to right');
        equal(this.gradient.angle(), 90, 'test angle to right');

        this.gradient.angle('to bottom');
        equal(this.gradient.angle(), 180, 'test angle to bottom');

        this.gradient.angle('to left');
        equal(this.gradient.angle(), 270, 'test angle to left');

        this.gradient.angle('to top right');
        equal(this.gradient.angle(), 45, 'test angle to top right');

        this.gradient.angle('to right top');
        equal(this.gradient.angle(), 45, 'test angle to right top');

        this.gradient.angle('to right bottom');
        equal(this.gradient.angle(), 135, 'test angle to right bottom');

        this.gradient.angle('to bottom right');
        equal(this.gradient.angle(), 135, 'test angle to bottom right');

        this.gradient.angle('to bottom left');
        equal(this.gradient.angle(), 225, 'test angle to bottom left');

        this.gradient.angle('to left bottom');
        equal(this.gradient.angle(), 225, 'test angle to left bottom');

        this.gradient.angle('to left top');
        equal(this.gradient.angle(), 315, 'test angle to left top');

        this.gradient.angle('to top left');
        equal(this.gradient.angle(), 315, 'test angle to top left');

        this.gradient.angle('top');
        equal(this.gradient.angle(), 180, 'test angle top');

        this.gradient.angle('right');
        equal(this.gradient.angle(), 270, 'test angle right');

        this.gradient.angle('bottom');
        equal(this.gradient.angle(), 0, 'test angle bottom');

        this.gradient.angle('left');
        equal(this.gradient.angle(), 90, 'test angle left');

        this.gradient.angle('top right');
        equal(this.gradient.angle(), 225, 'test angle top right');

        this.gradient.angle('right top');
        equal(this.gradient.angle(), 225, 'test angle right top');

        this.gradient.angle('right bottom');
        equal(this.gradient.angle(), 315, 'test angle right bottom');

        this.gradient.angle('bottom right');
        equal(this.gradient.angle(), 315, 'test angle bottom right');

        this.gradient.angle('bottom left');
        equal(this.gradient.angle(), 45, 'test angle bottom left');

        this.gradient.angle('left bottom');
        equal(this.gradient.angle(), 45, 'test angle left bottom');

        this.gradient.angle('left top');
        equal(this.gradient.angle(), 135, 'test angle left top');

        this.gradient.angle('top left');
        equal(this.gradient.angle(), 135, 'test angle top left');
    });


    test('option angleUseKeyword', function(){
        var gradient = new $.asGradient('linear-gradient(135deg, yellow, blue)', {
            angleUseKeyword: false,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(135deg, yellow, blue)', 'test angleUseKeyword false 135deg');

        gradient = new $.asGradient('linear-gradient(0deg, yellow, blue)', {
            angleUseKeyword: false,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(0deg, yellow, blue)', 'test angleUseKeyword false 0deg');

        gradient = new $.asGradient('linear-gradient(0deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to top, yellow, blue)', 'test angleUseKeyword true 0deg');

        gradient = new $.asGradient('linear-gradient(45deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to top right, yellow, blue)', 'test angleUseKeyword true 45deg');

        gradient = new $.asGradient('linear-gradient(90deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to right, yellow, blue)', 'test angleUseKeyword true 90deg');

        gradient = new $.asGradient('linear-gradient(135deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to right bottom, yellow, blue)', 'test angleUseKeyword true 135deg');

        gradient = new $.asGradient('linear-gradient(180deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to bottom, yellow, blue)', 'test angleUseKeyword true 180deg');

        gradient = new $.asGradient('linear-gradient(225deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to bottom left, yellow, blue)', 'test angleUseKeyword true 225deg');

        gradient = new $.asGradient('linear-gradient(270deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to left, yellow, blue)', 'test angleUseKeyword true 270deg');

        gradient = new $.asGradient('linear-gradient(315deg, yellow, blue)', {
            angleUseKeyword: true,
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to left top, yellow, blue)', 'test angleUseKeyword true 315deg');
    });

    test('toString', function(){
        this.gradient.fromString('-webkit-linear-gradient(top, #2F2727, #1a82f7)');
        equal(this.gradient.toString(), 'linear-gradient(to bottom, #2f2727, #1a82f7)', 'test toString standare');
        equal(this.gradient.toString('-webkit-'), '-webkit-linear-gradient(top, #2f2727, #1a82f7)', 'test toString webkit');
        equal(this.gradient.toString('-moz-'), '-moz-linear-gradient(top, #2f2727, #1a82f7)', 'test toString moz');
        equal(this.gradient.toString('-o-'), '-o-linear-gradient(top, #2f2727, #1a82f7)', 'test toString o');
        equal(this.gradient.toString('-ms-'), '-ms-linear-gradient(top, #2f2727, #1a82f7)', 'test toString ms');
        equal(this.gradient.toString('-undefined-'), 'linear-gradient(to bottom, #2f2727, #1a82f7)', 'test toString undefined prefix');

        this.gradient.fromString('-moz-linear-gradient(top, rgba(248,80,50,1) 0%, rgba(246,41,12,1) 51%, rgba(240,47,23,1) 71%, rgba(231,56,39,1) 100%)');
        equal(this.gradient.toString(), 'linear-gradient(to bottom, rgb(248, 80, 50), rgb(246, 41, 12) 51%, rgb(240, 47, 23) 71%, rgb(231, 56, 39))', 'test toString 2');
    });

    test('option forceStandard', function(){
        var gradient = new $.asGradient('-webkit-linear-gradient(left, #2F2727, #1a82f7)', {
            forceStandard: false
        });
        equal(gradient.toString(), '-webkit-linear-gradient(left, #2f2727, #1a82f7)', 'test forceStandard false');

        gradient = new $.asGradient('-webkit-linear-gradient(right, #2F2727, #1a82f7)', {
            forceStandard: true
        });
        equal(gradient.toString(), 'linear-gradient(to left, #2f2727, #1a82f7)', 'test forceStandard true');
    });

    test('option cleanPosition', function(){
        var gradient = new $.asGradient('linear-gradient(to bottom, yellow 0%, blue 100%)', {
            cleanPosition: false
        });
        equal(gradient.toString(), 'linear-gradient(to bottom, yellow 0%, blue 100%)', 'test cleanPosition false');

        gradient = new $.asGradient('linear-gradient(to bottom, yellow 0%, blue 100%)', {
            cleanPosition: true
        });
        equal(gradient.toString(), 'linear-gradient(to bottom, yellow, blue)', 'test cleanPosition true');
    });

    test('option forceColorFormat', function(){
        var gradient = new $.asGradient('linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)', {
            forceColorFormat: false,
            cleanPosition: false
        });
        equal(gradient.toString(), 'linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(246, 246, 246) 47%, rgb(237, 237, 237) 100%)', 'test forceColorFormat false');

        gradient = new $.asGradient('linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)', {
            forceColorFormat: true,
            cleanPosition: false
        });
        equal(gradient.toString(), 'linear-gradient(to right, #fff 0%, #f6f6f6 47%, #ededed 100%)', 'test forceColorFormat true');
    });

    test('option degradationFormat', function(){
        var gradient = new $.asGradient({
            degradationFormat: 'rgb'
        });
        gradient.append('#fff');
        equal(gradient.toString(), 'rgb(255, 255, 255)', 'test degradationFormat rgb');

        gradient = new $.asGradient({
            degradationFormat: 'hex'
        });
        gradient.append('#fff');
        equal(gradient.toString(), '#fff', 'test degradationFormat hex');

        gradient = new $.asGradient({
            degradationFormat: false
        });
        gradient.append('#aa2312');
        equal(gradient.toString(), '#aa2312', 'test degradationFormat false');
    });

    test('option emptyString', function(){
        var gradient = new $.asGradient({
            emptyString: ''
        });
        equal(gradient.toString(), '', 'test emptyString');

        gradient = new $.asGradient({
            emptyString: 'There is no gradient'
        });
        equal(gradient.toString(), 'There is no gradient', 'test custom emptyString');
    });

    test('undefined position', function(){
        var gradient = new $.asGradient('linear-gradient(to bottom, yellow, blue)', {
            cleanPosition: false
        });
        equal(gradient.toString(), 'linear-gradient(to bottom, yellow 0%, blue 100%)', 'test position');

        gradient.fromString('linear-gradient(to bottom, yellow, red, blue)');
        equal(gradient.toString(), 'linear-gradient(to bottom, yellow 0%, red 50%, blue 100%)', 'test three color position');

        gradient.fromString('linear-gradient(to bottom, yellow, red, white, blue)');
        equal(gradient.toString(), 'linear-gradient(to bottom, yellow 0%, red 33%, white 66%, blue 100%)', 'test four color position');
    });


    test('current', function() {
        this.gradient.empty();

        this.gradient.insert('#fff');
        equal(this.gradient.current, 0, 'current should be set to 0 after first insert');
        equal(this.gradient.get().color.toString(), '#fff', 'get the first stop');

        this.gradient.insert('#000', undefined, 1);
        equal(this.gradient.current, 1, 'current should be set to 1 after second insert');
        equal(this.gradient.get().color.toString(), '#000', 'get the second stop');
        
        this.gradient.remove();
        equal(this.gradient.current, 0, 'current should be set to 0 after remove');
        equal(this.gradient.get().color.toString(), '#fff', 'get the first stop');
    });

    test('method getPrefixedStrings', function(){
        var gradient = new $.asGradient('linear-gradient(to right, #d4e4ef 0%, #86aecc 100%)', {
            prefixes: ['-moz-','-webkit-','-o-','-ms-'],
            cleanPosition: false
        });

        deepEqual(gradient.getPrefixedStrings(), [
            '-moz-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)',
            '-webkit-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)',
            '-o-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)',
            '-ms-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)'
        ], 'get the second stop');


    });

    test('method empty', function(){
        this.gradient.empty();
        equal(this.gradient.length, 0, 'test gradient size after empty');

        this.gradient.append('#fff');
        this.gradient.append('#ccc');

        equal(this.gradient.length, 2, 'test gradient size after add');
        this.gradient.empty();
        equal(this.gradient.length, 0, 'test gradient size after empty');
    });

    test('method insert', function() {
        this.gradient.empty();

        this.gradient.insert('#fff', undefined, 0);
        equal(this.gradient.length, 1, 'gradient size should be 1 after insert');
        equal(this.gradient.current, 0, 'current should be set to 0 after first insert');
        equal(this.gradient.value.stops.length, 1, 'gradient stops size should be 1 after insert');
        equal(this.gradient.get(0).color.toString(), '#fff', 'first color should be the same with the insert');

        this.gradient.insert('#aaa', undefined, 1);
        equal(this.gradient.length, 2, 'gradient size should be 2 after second insert');
        equal(this.gradient.current, 1, 'current should be set to 1 after second insert');
        equal(this.gradient.value.stops.length, 2, 'gradient stops size should be 2 after  secondinsert');
        equal(this.gradient.get(0).color.toString(), '#fff', 'first color should be the same with the first insert');
        equal(this.gradient.get(1).color.toString(), '#aaa', 'second color should be the same with the second insert');

        this.gradient.insert('#ccc', undefined, 2);
        equal(this.gradient.length, 3, 'gradient size should be 3 after second insert');
        equal(this.gradient.current, 2, 'current should be set to 2 after second insert');
        equal(this.gradient.value.stops.length, 3, 'gradient stops size should be 3 after  secondinsert');
        equal(this.gradient.get(0).color.toString(), '#fff', 'first color should be the same with the first insert');
        equal(this.gradient.get(1).color.toString(), '#aaa', 'second color should be the same with the second insert');
        equal(this.gradient.get(2).color.toString(), '#ccc', 'third color should be the same with the third insert');

        this.gradient.insert('#000', undefined, 2);
        equal(this.gradient.length, 4, 'gradient size should be 4 after fouth insert');
        equal(this.gradient.current, 2, 'current should be set to 2 after fouth insert');
        equal(this.gradient.value.stops.length, 4, 'gradient stops size should be 4 after fouth insert');
        equal(this.gradient.get(0).color.toString(), '#fff', 'check the first color');
        equal(this.gradient.get(1).color.toString(), '#aaa', 'check the second color');
        equal(this.gradient.get(2).color.toString(), '#000', 'check the third color');
        equal(this.gradient.get(3).color.toString(), '#ccc', 'check the fourth color');
    });

    test('from string', function() {
        this.gradient = new $.asGradient({
            forceStandard: false
        });
        this.gradient.fromString('-webkit-linear-gradient(50deg, #2F2727, #1a82f7)');
        equal(this.gradient._prefix, '-webkit-', 'test webkit prefix');
        equal(this.gradient._type, 'LINEAR', 'test linear type');
        equal(this.gradient.angle(), 40, 'test angle');
        equal(this.gradient.get(0).color.toString(), '#2f2727', 'test first color stop');
        equal(this.gradient.get(1).color.toString(), '#1a82f7', 'test second color stop');
        equal(this.gradient.get(0).position, undefined, 'test first color stop position');
        equal(this.gradient.get(1).position, undefined, 'test second color stop position');
        equal(this.gradient.length, 2, 'test color stop count');
        equal(this.gradient.toString(), '-webkit-linear-gradient(50deg, #2f2727, #1a82f7)', 'test toString()');

        this.gradient.fromString('-moz-linear-gradient(left, rgba(248,80,50,0.8) 1%, rgba(241,111,92,0.8) 50%, rgba(240,47,23,0.8) 71%, rgba(231,56,39,0.8) 99%)');
        equal(this.gradient._prefix, '-moz-', 'test moz prefix');
        equal(this.gradient._type, 'LINEAR', 'test linear type');
        equal(this.gradient.angle(), 90, 'test angle');
        equal(this.gradient.get(0).color.toString(), 'rgba(248, 80, 50, 0.8)', 'test first color stop');
        equal(this.gradient.get(1).color.toString(), 'rgba(241, 111, 92, 0.8)', 'test second color stop');
        equal(this.gradient.get(2).color.toString(), 'rgba(240, 47, 23, 0.8)', 'test third color stop');
        equal(this.gradient.get(3).color.toString(), 'rgba(231, 56, 39, 0.8)', 'test fourth color stop');
        equal(this.gradient.get(0).position, 0.01, 'test first color stop position');
        equal(this.gradient.get(1).position, 0.5, 'test second color stop position');
        equal(this.gradient.get(2).position, 0.71, 'test third color stop position');
        equal(this.gradient.get(3).position, 0.99, 'test fourth color stop position');
        equal(this.gradient.length, 4, 'test color stop count');
        equal(this.gradient.toString(), '-moz-linear-gradient(left, rgba(248, 80, 50, 0.8) 1%, rgba(241, 111, 92, 0.8) 50%, rgba(240, 47, 23, 0.8) 71%, rgba(231, 56, 39, 0.8) 99%)', 'test toString()');

        this.gradient.fromString('linear-gradient(to bottom, hsla(0,0%, 100%,0.8), hsla( 0,0%,96%,0.8) 47%, hsla(0,0%,93%,0.8))');
        equal(this.gradient._prefix, null, 'test standare prefix');
        equal(this.gradient._type, 'LINEAR', 'test linear type');
        equal(this.gradient.angle(), 180, 'test angle');
        equal(this.gradient.get(0).color.toString(), 'hsla(0, 0%, 100%, 0.8)', 'test first color stop');
        equal(this.gradient.get(1).color.toString(), 'hsla(0, 0%, 96%, 0.8)', 'test second color stop');
        equal(this.gradient.get(2).color.toString(), 'hsla(0, 0%, 93%, 0.8)', 'test third color stop');
        equal(this.gradient.get(0).position, undefined, 'test first color stop position');
        equal(this.gradient.get(1).position, 0.47, 'test second color stop position');
        equal(this.gradient.get(2).position, undefined, 'test third color stop position');
        equal(this.gradient.length, 3, 'test color stop count');
        equal(this.gradient.toString(), 'linear-gradient(to bottom, hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 96%, 0.8) 47%, hsla(0, 0%, 93%, 0.8))', 'test toString()');
    });
}(jQuery));