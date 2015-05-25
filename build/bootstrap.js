/*
This file is part of Ext JS 5.1.1.451

Copyright (c) 2011-2015 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Version: 5.1.1.451 Build date: 2015-05-06 20:16:42 (130b7b8a6334f33aee5c2952cefb768cadb3bf78)

*/
/**
 * Load the library located at the same path with this file
 *
 * Will automatically load ext-all-debug.js if any of these conditions is true:
 *  - Current hostname is localhost
 *  - Current hostname is an IP v4 address
 *  - Current protocol is "file:"
 *  - Query string has `debug` parameter passed (http://foo/test.html?debug)
 *
 * If none of the above is true or the `nodebug` query string parameter is present (http://foo/test.html?nodebug),
 * ext-all.js will be loaded.
 */
(function() {
    var scripts = document.getElementsByTagName('script'),
        localhostTests = [
            /^localhost$/,
            /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d{1,5})?\b/ // IP v4
        ],
        host = window.location.hostname,
        isDevelopment = null,
        queryString = window.location.search,
        test, path, i, ln, scriptSrc, match;

    for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        match = scriptSrc.match(/ext-bootstrap\.js$/);

        if (match) {
            /**
             * use a path without the ext-bootstrap.js file on it. http://path/to/ext/ext-bootstrap.js will become
             * http://path/to/ext/
             */
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
            break;
        }
    }

    if (isDevelopment === null) {
        for (i = 0, ln = localhostTests.length; i < ln; i++) {
            test = localhostTests[i];

            if (host.search(test) !== -1) {
                //host is localhost or an IP address
                isDevelopment = true;
                break;
            }
        }
    }

    if (isDevelopment === null && window.location.protocol === 'file:') {
        isDevelopment = true;
    }

    if (!isDevelopment && queryString.match('(\\?|&)debug') !== null) {
        //debug is present in the query string
        isDevelopment = true;
    } else if (isDevelopment && queryString.match('(\\?|&)nodebug') !== null) {
        //nodebug is present in the query string
        isDevelopment = false;
    }

    document.write('<script type="text/javascript" charset="UTF-8" src="' +
        path + 'build/ext-all' + (isDevelopment ? '-debug' : '') + '.js"></script>');
})();
