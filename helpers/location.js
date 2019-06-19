"use strict";

/**
 * Variable Definition
 */

const request = require("request");

/**
 * Main location request codes
 */

module.exports = function(callback){
    return new Promise((resolve, reject) => {
        request({
            url: "http://ipinfo.io",
            json: true
        }, 
        (error, res, body) => {
            /* If there is a module error, it will return. */
            if(error) resolve();
            /* The message will return if there are no errors. */
            else resolve(body);
        });
    })
};