(function() {
    var env = jasmine.getEnv();

    if (!/local\-reporter=false/i.test(top.location.search)) {
        env.addReporter(parent.Test.SandBox.reporter);
    }

    if (/disableTryCatch=true/i.test(top.location.search)) {
        this.jasmine.CATCH_EXCEPTIONS = false;
    }

    if (window.Cmd) {
        top.Cmd = Cmd;
        env.addReporter(new Cmd.jasmine.Reporter());

        // Firefox driver keeps the focus in the address bar after driver.get(url), which 
        // causes many specs to fail, so we click on a focusable element to workaround
        // this behavior
        // https://code.google.com/p/selenium/issues/detail?id=8100
        Cmd.native.click(top.document.getElementById('collapseAll'));

        Cmd.native.switchTo({frame: 'sandbox'}, function() {
            env.execute();
        });
    } else {
        env.execute();
    }
})();
