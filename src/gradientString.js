import $ from 'jquery';
import * as util from './util';
import keywordAngleMap from './keywordAngleMap';

const angleKeywordMap = util.flip(keywordAngleMap);

const RegExpStrings = (() => {
  const color = /(?:rgba|rgb|hsla|hsl)\s*\([\s\d\.,%]+\)|#[a-z0-9]{3,6}|[a-z]+/i;
  const position = /\d{1,3}%/i;
  const angle = /(?:to ){0,1}(?:(?:top|left|right|bottom)\s*){1,2}|\d+deg/i;
  const stop = new RegExp(`(${color.source})\\s*(${position.source}){0,1}`, 'i');
  const stops = new RegExp(stop.source, 'gi');
  const parameters = new RegExp(`(?:(${angle.source})){0,1}\\s*,{0,1}\\s*(.*?)\\s*`, 'i');
  const full = new RegExp(`^(-webkit-|-moz-|-ms-|-o-){0,1}(linear|radial|repeating-linear)-gradient\\s*\\(\\s*(${parameters.source})\\s*\\)$`, 'i');

  return {
    FULL: full,
    ANGLE: angle,
    COLOR: color,
    POSITION: position,
    STOP: stop,
    STOPS: stops,
    PARAMETERS: new RegExp(`^${parameters.source}$`, 'i')
  };
})();

export default class GradientString {
  static matchString(string) {
    const matched = GradientString.parseString(string);
    if(matched && matched.value && matched.value.stops && matched.value.stops.length > 1){
      return true;
    }
    return false;
  }

  static parseString(string) {
    string = $.trim(string);
    let matched;
    if ((matched = RegExpStrings.FULL.exec(string)) !== null) {
      return {
        prefix: (typeof matched[1] === 'undefined') ? null : matched[1],
        type: matched[2],
        value: GradientString.parseParameters(matched[3])
      };
    } else {
      return false;
    }
  }

  static parseParameters(string) {
    let matched;
    if ((matched = RegExpStrings.PARAMETERS.exec(string)) !== null) {
      return {
        angle: (typeof matched[1] === 'undefined') ? 0 : matched[1],
        stops: GradientString.parseStops(matched[2])
      };
    } else {
      return false;
    }
  }

  static parseStops(string) {
    let matched;
    const result = [];
    if ((matched = string.match(RegExpStrings.STOPS)) !== null) {

      $.each(matched, (i, item) => {
        const stop = GradientString.parseStop(item);
        if (stop) {
          result.push(stop);
        }
      });
      return result;
    } else {
      return false;
    }
  }

  static formatStops(stops, cleanPosition) {
    let stop;
    const output = [];
    let positions = [];
    const colors = [];
    let position;

    for (let i = 0; i < stops.length; i++) {
      stop = stops[i];
      if (typeof stop.position === 'undefined' || stop.position === null) {
        if (i === 0) {
          position = 0;
        } else if (i === stops.length - 1) {
          position = 1;
        } else {
          position = undefined;
        }
      } else {
        position = stop.position;
      }
      positions.push(position);
      colors.push(stop.color.toString());
    }

    positions = ((data => {
      let start = null;
      let average;
      for (let i = 0; i < data.length; i++) {
        if (isNaN(data[i])) {
          if (start === null) {
            start = i;
            continue;
          }
        } else if (start) {
          average = (data[i] - data[start - 1]) / (i - start + 1);
          for (let j = start; j < i; j++) {
            data[j] = data[start - 1] + (j - start + 1) * average;
          }
          start = null;
        }
      }

      return data;
    }))(positions);

    for (let x = 0; x < stops.length; x++) {
      if (cleanPosition && ((x === 0 && positions[x] === 0) || (x === stops.length - 1 && positions[x] === 1))) {
        position = '';
      } else {
        position = ` ${GradientString.formatPosition(positions[x])}`;
      }

      output.push(colors[x] + position);
    }
    return output.join(', ');
  }

  static parseStop(string) {
    let matched;
    if ((matched = RegExpStrings.STOP.exec(string)) !== null) {
      return {
        color: matched[1],
        position: GradientString.parsePosition(matched[2])
      };
    } else {
      return false;
    }
  }

  static parsePosition(string) {
    if (typeof string === 'string' && string.substr(-1) === '%') {
      string = parseFloat(string.slice(0, -1) / 100);
    }

    if(typeof string !== 'undefined' && string !== null) {
      return parseFloat(string, 10);
    } else {
      return null;
    }
  }

  static formatPosition(value) {
    return `${parseInt(value * 100, 10)}%`;
  }

  static parseAngle(string, notStandard) {
    if (typeof string === 'string' && string.includes('deg')) {
      string = string.replace('deg', '');
    }
    if (!isNaN(string)) {
      if (notStandard) {
        string = GradientString.fixOldAngle(string);
      }
    }
    if (typeof string === 'string') {
      const directions = string.split(' ');

      const filtered = [];
      for (const i in directions) {
        if (util.isDirection(directions[i])) {
          filtered.push(directions[i].toLowerCase());
        }
      }
      let keyword = filtered.join(' ');

      if (!string.includes('to ')) {
        keyword = util.reverseDirection(keyword);
      }
      keyword = `to ${keyword}`;
      if (keywordAngleMap.hasOwnProperty(keyword)) {
        string = keywordAngleMap[keyword];
      }
    }
    let value = parseFloat(string, 10);

    if (value > 360) {
      value %= 360;
    } else if (value < 0) {
      value %= -360;

      if (value !== 0) {
        value += 360;
      }
    }
    return value;
  }

  static fixOldAngle(value) {
    value = parseFloat(value);
    value = Math.abs(450 - value) % 360;
    value = parseFloat(value.toFixed(3));
    return value;
  }

  static formatAngle(value, notStandard, useKeyword) {
    value = parseInt(value, 10);
    if (useKeyword && angleKeywordMap.hasOwnProperty(value)) {
      value = angleKeywordMap[value];
      if (notStandard) {
        value = util.reverseDirection(value.substr(3));
      }
    } else {
      if (notStandard) {
        value = GradientString.fixOldAngle(value);
      }
      value = `${value}deg`;
    }

    return value;
  }
}
