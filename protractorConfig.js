'use strict';

exports.config = {

    specs: ['features/**/*.feature'],
    seleniumServerJar:'./node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
    chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.26',
    getPageTimeout: 120000,
    defaultTimeoutInterval: 120000,
    restartBrowserBetweenTests: true,
    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        tags: [],
        require: ['features/support/**/*.js', 'features/**/step_definitions/**/*Steps.js'],
        format: 'pretty',
        keepAlive: false
    }
};
