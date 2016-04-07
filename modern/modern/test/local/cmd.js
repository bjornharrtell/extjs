if (top.location.search.indexOf("cmd-test=true") > 0) {
    var Cmd = {

        sendMessage: function(message, callback) {
            if (typeof message != 'object') {
                message = {
                    type: message
                };
            }

            message.seq = ++Cmd._seq;
            if (callback) {
                Cmd._callbacks[message.seq] = callback;
                message.callback = true;
            }
            Cmd._messages.push(message);
            Cmd._notifyWebDriver();
        },

        native: {
            getWindowHandle: function(callback) {
                Cmd.sendMessage({
                    type: 'getWindowHandle'
                }, callback);
            },

            getWindowHandles: function(callback) {
                Cmd.sendMessage({
                    type: 'getWindowHandles'
                }, callback);
            },

            switchTo: function(options, callback) {
                options.type = 'switchTo';
                Cmd.sendMessage(options, callback);
            },

            close: function(callback) {
                Cmd.sendMessage({
                    type: 'close'
                }, callback);
            },

            screenshot: function(name, callback) {
                Cmd.sendMessage({
                    type: 'screenshot',
                    name: name
                }, callback);
            },

            click: function(domElement, callback) {
                Cmd.sendMessage({
                    type: 'click',
                    elementId: domElement.id
                }, callback);
            },

            sendKeys: function(domElement, keys, callback) {
                Cmd.sendMessage({
                    type: 'sendKeys',
                    elementId: domElement.id,
                    keys: keys
                }, callback);
            }
        },

        // ----------------------------------------------------------------------------
        // Internal API used by test runners to report results and progress

        status: {
            runStarted: function(callback) {
                Cmd.sendMessage('testRunnerStarted', callback);
            },

            runFinished: function(callback) {
                Cmd.sendMessage('testRunnerFinished', callback);
            },

            suiteStarted: function(name, callback) {
                Cmd.sendMessage({
                    type: 'testSuiteStarted',
                    name: name
                }, callback);
            },

            suiteFinished: function(name, callback) {
                Cmd.sendMessage({
                    type: 'testSuiteFinished',
                    name: name
                }, callback);
            },

            testStarted: function(name, callback) {
                Cmd.sendMessage({
                    type: 'testStarted',
                    name: name
                }, callback);
            },

            testFinished: function(name, callback) {
                Cmd.sendMessage({
                    type: 'testFinished',
                    name: name
                }, callback);
            },

            testFailed: function(name, error, details, callback) {
                Cmd.sendMessage({
                    type: 'testFailed',
                    name: name,
                    error: error,
                    details: details
                }, callback);
            },

            getCurrentChunk: function(array) {
                var cmdTestSplit = Cmd._getParam('cmd-test-split'),
                    cmdTestChunk, cmdTestChunks;

                if (cmdTestSplit) {
                    cmdTestChunk = cmdTestSplit.split("/")[0];
                    cmdTestChunks = cmdTestSplit.split("/")[1];
                    return Cmd._split(array, cmdTestChunks)[cmdTestChunk];
                } else {
                    return array;
                }
            }
        },

        // ----------------------------------------------------------------------------
        // Private API

        _messages: [],
        _seq: 0,
        _callbacks: {},

        _callback: function(seq, result) {
            var fn = Cmd._callbacks[seq];
            delete Cmd._callbacks[seq];
            fn(result);
        },

        _purgeMessages: function(count) {
            Cmd._messages = Cmd._messages.slice(count, Cmd._messages.length);
        },

        _notifyWebDriver: function() {
            if (Cmd._pendingNotifier) {
                return;
            }

            var notifier = function() {
                var messages,
                    webDriverCallback = Cmd._webDriverCallback;
                if (webDriverCallback) {
                    messages = JSON.stringify(Cmd._messages);
                    Cmd._webDriverCallback = null;
                    Cmd._pendingNotifier = null;
                    webDriverCallback(messages);
                } else {
                    Cmd._pendingNotifier = notifier;
                }
            };

            notifier();
        },

        _split: function(a, n) {
            var len = a.length,out = [], i = 0;
            while (i < len) {
                var size = Math.ceil((len - i) / n--);
                out.push(a.slice(i, i += size));
            }
            return out;
        },

        _getParam: function(name) {
            if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(top.location.search)) {
                return decodeURIComponent(name[1]);
            }
        }

    };
}
