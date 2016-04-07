Ext.require([
    "*"
], function () {
    Ext.onReady(function () {
        if (/loadSpecs=true/i.test(location.search)) {
            Ext.Boot.load({
                url: ["../bootstrap-specs.js"]
            });
        }
    });
});
