'use strict';

var HomePage = function () {
    //browser.get('http://automationpractice.com');
    var sign_in = element(by.css('.header_user_info'));
    var search = element(by.css('.search_query'));

    this.go = function(){
        browser.get('http://automationpractice.com');
    };

    this.search_product = function(name){
        search.sendKeys(name)
    };
};
module.exports = HomePage;