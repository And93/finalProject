'use strict';

const logger = require('../../configs/winstone.conf').logger;

// TODO merge these two functions

const highlightElement = (element) => {

    let bg;
    return element.getCssValue('backgroundColor').then((col) => {
        bg = col;
    }).then(() => {
        return browser.executeScript('arguments[0].style.backgroundColor = "red"', element);
    }).then(() => {
        return browser.driver.sleep(1000); // TODO Delete this sleep
    }).then(() => {
        return browser.executeScript(`arguments[0].style.backgroundColor = "${bg}"`, element);
    }).then(() => {
        return browser.driver.sleep(1000); // TODO Delete this sleep
    }).catch(err => {
        logger.error('Error is: ' + err);
        throw new Error(err);
    });
};

const highlightElement2 = (element) => {

    const styleOptions = 'color: Red; border: 2px solid red;';
    return browser.executeScript('arguments[0].setAttribute("style", arguments[1]);', element, styleOptions).then(() => {
        return browser.wait(() => {
            return element.getCssValue('border').then((border) => {
                return border.toString().indexOf('2px solid rgb(255,') > -1;
                });
            }, 
            TIMEOUT.m,
            'Style is not applied!'
        );
    }, (err) => {
        logger.error('Error is: ' + err);
        throw new Error(err);
    });
};