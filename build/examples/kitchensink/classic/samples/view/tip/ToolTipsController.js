Ext.define('KitchenSink.view.ToolTipsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tooltips',

    afterRender: function() {
        var tips = [{
            target: this.lookup('basicTip').el,
            html: 'A simple tooltip'
        }, {
            target: this.lookup('autoHide').el,
            title: 'A title',
            autoHide: false,
            closable: true,
            html: 'Click the X to close this'
        }, {
            target: this.lookup('ajax').el,
            width: 200,
            loader: {
                url: '/KitchenSink/ToolTipsSimple',
                loadOnRender: true
            },
            dismissDelay: 15000 // auto hide after 15 seconds
        }, {
            target: this.lookup('track').el,
            title: 'Mouse Track',
            width: 200,
            html: 'This tip will follow the mouse while it is over the element',
            trackMouse: true
        }, {
            target: this.lookup('rich').el,
            anchor: 'left',
            html: '<ul style="margin-bottom: 15px;">' +
                      '<li>5 bedrooms</li>' + 
                      '<li>Close to transport</li>' +
                      '<li>Large backyard</li>' +
                  '</ul>' +
                  '<img style="width: 400px; height: 300px;" src="resources/house.jpg" />',
            width: 415,
            autoHide: false,
            closable: true
        }, {
            target: this.lookup('center').el,
            anchor: 'top',
            anchorOffset: 85, // center the anchor on the tooltip
            html: 'This tip\'s anchor is centered'
        }, {
            target: this.lookup('trackAnchor'),
            anchor: 'right',
            trackMouse: true,
            html: 'Tracking while you move the mouse'
        }];

        this.tips = Ext.Array.map(tips, function(cfg) {
            cfg.showOnTap = true;
            return new Ext.tip.ToolTip(cfg);
        });
    },

    destroy: function() {
        this.tips = Ext.destroy(this.tips);
        this.callParent();
    }
});