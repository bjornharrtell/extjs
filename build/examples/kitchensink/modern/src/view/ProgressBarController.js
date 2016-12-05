Ext.define('KitchenSink.view.ProgressBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.progressbar',


    init: function() {
        var me = this,
            view = me.getView(),
            vm = this.getViewModel(), 
            progress;

        me._interval = setInterval(function() {
            if (view.isDestroyed) {
                clearInterval(me._interval);
                return;
            }
            progress = vm.get('progress');
            progress += 0.01;
            if (progress > 1) {
                progress = 0;
            }
            vm.set('progress', progress);
        }, 150);
    }
});
