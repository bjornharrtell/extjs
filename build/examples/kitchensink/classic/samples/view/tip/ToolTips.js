Ext.define('KitchenSink.view.tip.ToolTips', {
    extend: 'Ext.Container',
    xtype: 'tooltips',

    //<examples>
    requires: [
        'KitchenSink.view.ToolTipsController',
        'KitchenSink.data.ToolTips'
    ],

    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/tip/ToolTipsController.js'
    }],
    //<examples>

    controller: 'tooltips',
    padding: 20,
    layout: 'vbox',
    
    defaultType: 'container',
    defaults: {
        layout: {
            type: 'hbox',
            align: 'start',
            pack: 'center'
        },

        defaultType: 'button',
        margin: '0 0 50 0',
        defaults: {
            margin: '0 15 0 0',
            minWidth: 150
        }
    },

    items: [{
        items: [{
            text: 'Basic Tip',
            reference: 'basicTip'
        }, {
            text: 'autoHide: false',
            reference: 'autoHide'
        }, {
            text: 'Ajax Tip',
            reference: 'ajax'
        }, {
            text: 'Mouse Track',
            reference: 'track'
        }]
    }, {
        items: [{
            text: 'anchor: "right", rich content',
            reference: 'rich'
        }, {
            text: 'Anchor below',
            reference: 'center'
        }, {
            text: 'Anchor with tracking',
            reference: 'trackAnchor'
        }]
    }, {
        defaultType: 'component',
        items: [{
            cls: 'qtip-item color1',
            html: '<div data-qtip="This tip is inline">Inline Tip</div>'
        }, {
            cls: 'qtip-item color2',
            html: '<div data-qtip="This tip has a fixed width" data-qwidth="400">Fixed width inline tip</div>'
        }, {
            cls: 'qtip-item color3',
            html: '<div data-qtip="This tip has a title" data-qtitle="The title">Inline tip with title</div>'
        }, {
            cls: 'qtip-item color4',
            html: '<div data-qtip="Aligned top" data-qalign="bl-tl">Inline tip align top</div>'
        }]
    }]
});