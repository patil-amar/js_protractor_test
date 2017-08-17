'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var EC = protractor.ExpectedConditions;

var helper = require('../support/helper.js')

var home_page_steps = function() {

    var f_name = helper.getRandomString(10)
    var l_name = helper.getRandomString(10)
    var first_product_name = ''

    this.Before(function () {
        browser.ignoreSynchronization = true;
    });

    this.Given(/^I navigate to home page$/, function() {
        browser.waitForAngularEnabled(false);
        return browser.get('http://automationpractice.com');
    });

    this.When(/^When I sign in with valid credentials$/, function() {
        browser.ignoreSynchronization = true;
        var submitLogin = element(by.id('SubmitLogin'))
        var sign_in_btn = element(by.css('.header_user_info'))
        var email_field = element(by.id('email'))
        var password_field = element(by.id('passwd'))

        sign_in_btn.click();
        email_field.sendKeys('patil-amar@hotmail.com');
        password_field.sendKeys('123456789');
        return submitLogin.click();
    });

    this.Then(/^I should be successfuly logged in$/, function() {
        browser.waitForAngularEnabled(false);
        var logout = element(by.className('logout'))
        return expect(logout.isDisplayed()).to.eventually.equal(true);
    });

    this.When(/^I search for product "([^"]*)"$/, function (product_name) {
        browser.waitForAngularEnabled(false);
        var search_box = element(by.id('search_query_top'));
        var search_btn = element(by.className('button-search'));
        search_box.clear();
        search_box.sendKeys(product_name);
        return search_btn.click();
    });

    this.Then(/^I should see one item displayed in search result page$/, function () {
        browser.waitForAngularEnabled(false);
        //console.log(element.all(by.className('product_list')).count())
        var counter = element.all(by.className('product_list')).count()
        return counter.then(function (value) {
            expect(value).to.eql(1)
        });
    });

    this.When(/^When I sign in with invalid credentials$/, function () {
        browser.ignoreSynchronization = true;
        var submitLogin = element(by.id('SubmitLogin'))
        var sign_in_btn = element(by.css('.header_user_info'))
        var email_field = element(by.id('email'))
        var password_field = element(by.id('passwd'))

        sign_in_btn.click();
        email_field.sendKeys('abc@test.com');
        password_field.sendKeys('123456789');
        return submitLogin.click();
    });

    this.Then(/^I should see authentication failed alert displayed$/, function () {
        var login_alert = element(by.cssContainingText('li','Authentication failed.'))
        return expect(login_alert.isDisplayed()).to.eventually.equal(true)

    });

    this.Given(/^I am on login page$/, function () {
        browser.waitForAngularEnabled(false);
        return browser.get('http://automationpractice.com/index.php?controller=authentication&back=my-account');
    });

    this.Given(/^I choose to create an account with valid email$/, function () {
        var create_account_email = element(by.id('email_create'))
        var create_account_btn = element(by.id('SubmitCreate'))
        create_account_email.clear();
        create_account_email.sendKeys(helper.getRandomEmail(15));
        return create_account_btn.click();
    });

    this.When(/^I enter valid values on the registration page$/, function () {
        var title = element(by.id('id_gender1'));
        var first_name = element(by.id('customer_firstname'));
        var last_name = element(by.id('customer_lastname'));
        var password = element(by.id('passwd'));
        var dob_day = element(by.id('days'));
        var dob_month = element(by.id('months'));
        var dob_year = element(by.id('years'));
        var address_line_1 = element(by.id('address1'));
        var city = element(by.id('city'));
        var state = element(by.id('id_state'));
        var postcode = element(by.id('postcode'));
       // var country = element(by.id('id_country'))
        var mobile_nr = element(by.id('phone_mobile'));
        browser.wait(EC.presenceOf(first_name), 5000);

        title.click();

        first_name.sendKeys(f_name);
        last_name.sendKeys(l_name);
        password.sendKeys(helper.getRandomString(10));
        dob_day.sendKeys('1');
        dob_month.sendKeys('January');
        dob_year.sendKeys('2010');
        address_line_1.sendKeys(helper.getRandomString(30));
        city.sendKeys(helper.getRandomString(10));
        state.sendKeys('Alabama');
        postcode.sendKeys(helper.getRandomNum(5));
        return mobile_nr.sendKeys(helper.getRandomNum(10));
    });

    this.When(/^I click register$/, function () {
        var register_btn = element(by.id('submitAccount'));
        return register_btn.click();
    });

    this.Then(/^I should be logged in as a new user$/, function () {
        var login_name = element(by.className('account')).element(by.tagName('span')).getText()
        return login_name.then(function (value) {
            expect(value).to.eql(f_name + ' ' + l_name)
        });
    });

    this.When(/^I add the (\d+)st item to cart$/, function (item_index) {
        var products_container = element.all(by.className('ajax_add_to_cart_button'))
        var products_names = element(by.className('product_list')).all(by.className('product-name')).getText()
         products_names.then(function (value) {
            first_product_name = value[item_index-1]
        });
        return products_container.first().click();

    });

    this.Then(/^I should see item added to my shopping cart$/, function () {
        var proceed_checkout_btn = element(by.cssContainingText('a','Proceed to checkout'))
        browser.wait(EC.visibilityOf(proceed_checkout_btn), 5000);
        proceed_checkout_btn.click()
        var cart_items = element(by.id('order-detail-content')).all(by.className('product-name')).getText()
        return cart_items.then(function (value) {
            expect(first_product_name).to.eql(value[0])
        })
    });

};

module.exports = home_page_steps;