// Karma configuration
import babelify from 'babelify';
import browserify from 'browserify';
import browserifyBabalIstanbul from 'browserify-babel-istanbul';
import isparta from 'isparta';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'test/*.spec.js'
    ],

    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          presets: ["es2015"],
          ignore: /node_modules/
        }],
        browserifyBabalIstanbul({
          instrumenter: isparta,
          instrumenterConfig: { babel: { presets: ["es2015"] } },
          ignore: ['**/node_modules/**', 'test/**']
        })
      ]
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
       sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/**/*.js": ["browserify"],
      "test/**/*.spec.js": ["browserify"]
    },

    // optionally, configure the reporter
    // text displays it within the console (alternative: text-summary)
    // lcov creates a codecov compatible report
    coverageReporter: {
      reporters: [
        {'type': 'text'},
        {'type': 'html', dir: 'coverage'},
        {'type': 'lcov'}
      ]
    },

    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // coverage is from karma-coverage and provides Istanbul code coverage report
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // Currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],

    // Which plugins to enable
    plugins: [
      'karma-mocha',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-browserify',
      'karma-babel-preprocessor'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
