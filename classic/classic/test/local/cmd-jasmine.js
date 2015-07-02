(function() {
    if (typeof window.Cmd === 'undefined') {
        return;
    }
    
    if (typeof window.jasmine === 'undefined') {
        throw new Error("Jasmine library does not exist in global namespace!");
    }

    var exportGlobal = function(instance, name) {
        window[name] = function() {
            instance[name].apply(instance, arguments);
        }
        addGlobal(name);
    }

    var JasmineReporter = function() {
        var me = this;
        exportGlobal(me, 'waitsForScreenshot');
        exportGlobal(me, 'waitsForClick');
        exportGlobal(me, 'waitsForSendKeys');
    };

    JasmineReporter.prototype = {

        waitsForScreenshot: function(name) {
            var done = false
            runs(function() {
                Cmd.native.screenshot(name, function() {
                    done = true;
                });
            });
            waitsFor(function() {
                return done;
            });
        },

        waitsForClick: function(domElement) {
            var done = false
            runs(function() {
                Cmd.native.click(domElement, function() {
                    done = true;
                });
            });
            waitsFor(function() {
                return done;
            });
        },

        waitsForSendKeys: function(domElement, keys) {
            var done = false;
            runs(function() {
                Cmd.native.sendKeys(domElement, keys, function() {
                    done = true;
                });
            });
            waitsFor(function() {
                return done;
            });
        },

        reportRunnerStarting: function(runner) {
            Cmd.status.runStarted();
        },

        reportRunnerResults: function(runner) {
            Cmd.status.runFinished();
        },

        reportSpecResults: function(spec) { },

        reportSpecStarting: function(spec) { },

        reportSuiteStarting: function(suite) {
            Cmd.status.suiteStarted(suite.description);
        },

        reportSuiteResults: function(suite) {
            var results = suite.results();
            var eachSpecFn = function(spec) {
                if (spec.description) {
                    Cmd.status.testStarted(spec.description);
                    var specResultFn = function(result){
                        if (!result.passed()) {
                            Cmd.status.testFailed(spec.description, result.message, result.trace.stack);
                        }
                    };

                    for (var j = 0, jlen = spec.items_.length; j < jlen; j++) {
                        specResultFn(spec.items_[j]);
                    }
                    Cmd.status.testFinished(spec.description);
                }
            };
            for (var i = 0, ilen = results.items_.length; i < ilen; i++) {
                eachSpecFn(results.items_[i]);
            }

            Cmd.status.suiteFinished(suite.description);
        }

    };

    Cmd.jasmine = {
        Reporter: JasmineReporter
    };
})();
