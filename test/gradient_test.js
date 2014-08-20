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
            this.gradient = new $.asGradient();
        },
        teardown: function() {
            this.gradient.empty();
        }
    });

    test('init', function(){

        equal(this.gradient.length, 0, 'test length first');

        this.gradient.append('#fff');
        equal(this.gradient.length, 1, 'test length after append');

        equal(this.gradient.get().color.toString(), '#ffffff', 'get the first stop');

        this.gradient.append('rgba(255, 255, 255, 0.7)');
        equal(this.gradient.length, 2,'test length after the second append');

        equal(this.gradient.get(1).color.toString(), 'rgba(255, 255, 255, 0.7)', 'get the second stop');

        this.gradient.remove(1);
        equal(this.gradient.length, 1, 'test length after remove');



    });

    test('current', function() {
        this.gradient.empty();

        this.gradient.insert('#ffffff');
        equal(this.gradient.current, 0, 'current should be set to 0 after first insert');
        equal(this.gradient.get().color.toString(), '#ffffff', 'get the first stop');

        this.gradient.insert('#000000', undefined, 1);
        equal(this.gradient.current, 1, 'current should be set to 1 after second insert');
        equal(this.gradient.get().color.toString(), '#000000', 'get the second stop');
        
        this.gradient.remove();
        equal(this.gradient.current, 0, 'current should be set to 0 after remove');
        equal(this.gradient.get().color.toString(), '#ffffff', 'get the first stop');
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
        equal(this.gradient.get(0).color.toString(), '#ffffff', 'first color should be the same with the insert');

        this.gradient.insert('#aaa', undefined, 1);
        equal(this.gradient.length, 2, 'gradient size should be 2 after second insert');
        equal(this.gradient.current, 1, 'current should be set to 1 after second insert');
        equal(this.gradient.value.stops.length, 2, 'gradient stops size should be 2 after  secondinsert');
        equal(this.gradient.get(0).color.toString(), '#ffffff', 'first color should be the same with the first insert');
        equal(this.gradient.get(1).color.toString(), '#aaaaaa', 'second color should be the same with the second insert');

        this.gradient.insert('#ccc', undefined, 2);
        equal(this.gradient.length, 3, 'gradient size should be 3 after second insert');
        equal(this.gradient.current, 2, 'current should be set to 2 after second insert');
        equal(this.gradient.value.stops.length, 3, 'gradient stops size should be 3 after  secondinsert');
        equal(this.gradient.get(0).color.toString(), '#ffffff', 'first color should be the same with the first insert');
        equal(this.gradient.get(1).color.toString(), '#aaaaaa', 'second color should be the same with the second insert');
        equal(this.gradient.get(2).color.toString(), '#cccccc', 'third color should be the same with the third insert');

        this.gradient.insert('#000', undefined, 2);
        equal(this.gradient.length, 4, 'gradient size should be 4 after fouth insert');
        equal(this.gradient.current, 2, 'current should be set to 2 after fouth insert');
        equal(this.gradient.value.stops.length, 4, 'gradient stops size should be 4 after fouth insert');
        equal(this.gradient.get(0).color.toString(), '#ffffff', 'check the first color');
        equal(this.gradient.get(1).color.toString(), '#aaaaaa', 'check the second color');
        equal(this.gradient.get(2).color.toString(), '#000000', 'check the third color');
        equal(this.gradient.get(3).color.toString(), '#cccccc', 'check the fourth color');
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
        this.gradient.angle('top');
        equal(this.gradient.angle(), 0, 'test angle top');

        this.gradient.angle('right');
        equal(this.gradient.angle(), 90, 'test angle right');

        this.gradient.angle('bottom');
        equal(this.gradient.angle(), 180, 'test angle bottom');

        this.gradient.angle('left');
        equal(this.gradient.angle(), 270, 'test angle left');

        this.gradient.angle('top right');
        equal(this.gradient.angle(), 45, 'test angle top right');

        this.gradient.angle('right top');
        equal(this.gradient.angle(), 45, 'test angle right top');

        this.gradient.angle('right bottom');
        equal(this.gradient.angle(), 135, 'test angle right bottom');

        this.gradient.angle('bottom right');
        equal(this.gradient.angle(), 135, 'test angle bottom right');

        this.gradient.angle('bottom left');
        equal(this.gradient.angle(), 225, 'test angle bottom left');

        this.gradient.angle('left bottom');
        equal(this.gradient.angle(), 225, 'test angle left bottom');

        this.gradient.angle('left top');
        equal(this.gradient.angle(), 315, 'test angle left top');

        this.gradient.angle('top left');
        equal(this.gradient.angle(), 315, 'test angle top left');
    });
}(jQuery));