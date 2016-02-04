// ==UserScript==
// @name         Browser Keymaps
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Key map support on Chrome browser with leader support
// @author       Herryanto Siatono
// @match        http://*/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var LEADER = ',';

var KEY_REPEAT_TIMEOUT = 500;

var KEY_MAPS = {
    'a': submitFirstForm
};

var keyInputs, repeatTimeoutId;

function submitFirstForm() {
    var firstForm = document.forms[0];
    if (firstForm) {
        firstForm.submit();
    }
}

function keypressHandler(e) {
    var charCode = String.fromCharCode(e.keyCode);

    if (keyInputs) {
        keyInputs.push(charCode);

        var key = keyInputs.join(' ');
        var matchFunc = keysMap[key];

        if (matchFunc) {
            console.debug('Trigger key:', key);
            matchFunc.call();
        } else {
            resetKeyTimeout();
        }
    } else if (charCode === LEADER) {
        keyInputs = [];
        resetKeyTimeout();
    }
}

function resetKeyTimeout() {
    // Clear previous timeout
    if (repeatTimeoutId) {
        clearTimeout(repeatTimeoutId);
    }

    repeatTimeoutId = setTimeout(function() {
        keyInputs = undefined;
        repeatTimeoutId = undefined;
    }, KEY_REPEAT_TIMEOUT);
}

document.body.addEventListener('keypress', keypressHandler);



