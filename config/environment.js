/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'stock-nyquist',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.contentSecurityPolicy = {
      'default-src': 	'"none" http://www.quandl.com',
      'script-src':   '"self" "unsafe-inline" http://nyquist-stock-tracker-hawaiianchimp.c9users.io:8081 https://nyquist-stock-tracker-hawaiianchimp.c9users.io/ https://*.google.com http://localhost:8080 http://0.0.0.0:8080 https://localhost:8080 https://0.0.0.0:8080 http://www.quandl.com',
      'object-src':		'"none"',
      'style-src':		'"self" "unsafe-inline" http://nyquist-stock-tracker-hawaiianchimp.c9users.io:8081 https://nyquist-stock-tracker-hawaiianchimp.c9users.io https://*.google.com http://localhost:8080 http://0.0.0.0:8080 https://localhost:8080 https://0.0.0.0:8080',
      'img-src':			'"self" "unsafe-inline" data: http://localhost:8080 http://0.0.0.0:8080 https://localhost:8080 https://0.0.0.0:8080',
      'media-src':		'"self"',
      'frame-src':		'"none"',
      'font-src': 		'"self" "unsafe-inline" http://localhost:8080 http://0.0.0.0:8080 https://localhost:8080 https://0.0.0.0:8080 https://*.gstatic.com',
      'connect-src': 	'"self" "unsafe-inline" ws://nyquist-stock-tracker-hawaiianchimp.c9users.io:8081 nyquist-stock-tracker-hawaiianchimp.c9users.io https://*.google.com http://localhost:8080 http://0.0.0.0:8080 https://localhost:8080 https://0.0.0.0:8080 http://www.quandl.com'

    };
  }

  return ENV;
};
