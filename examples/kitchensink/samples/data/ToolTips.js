Ext.define('KitchenSink.data.ToolTips', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function(){
    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/ToolTipsSimple': {
            type: 'basic',
            responseText: function() {
                var s = Ext.Date.format(new Date(), 'h:i a');
                return 'The current time is ' + s;
            }
        }
    });

});