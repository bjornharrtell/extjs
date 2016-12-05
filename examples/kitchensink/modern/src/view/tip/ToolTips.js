Ext.define('KitchenSink.view.tip.ToolTips', {
    extend: 'Ext.Container',

    requires: [
        'KitchenSink.view.tip.ToolTipsController',
        'KitchenSink.data.ToolTips'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/tip/ToolTipsController.js'
    }],
    // <example>

    cls: 'demo-solid-background',
    shadow: true,

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
            tooltip: {
                html: 'A simple tooltip'
            }
        }, {
            text: 'autoHide: false',
            tooltip: {
                title: 'A title',
                autoHide: false,
                closable: true,
                html: 'Click the X to close this'
            }
        }, {
            text: 'Ajax Tip',
            tooltip: {
                autoCreate: true,
                anchorToTarget: false,
                width: 200,
                dismissDelay: 15000,
                listeners: {
                    beforeshow: 'beforeAjaxTipShow'
                }
            }
        }, {
            text: 'Mouse Track',
            tooltip: {
                title: 'Mouse Track',
                html: 'This tip will follow the mouse while it is over the element',
                trackMouse: true
            }
        }]
    }, {
        items: [{
            text: 'anchor: "right", rich content',
            tooltip: {
                styleHtmlContent: true,
                html: '<ul style="margin-bottom: 15px;">' +
                          '<li>5 bedrooms</li>' + 
                          '<li>Close to transport</li>' +
                          '<li>Large backyard</li>' +
                      '</ul>' +
                      '<img style="width: 400px; height: 300px;" src="resources/house.jpg" />',

                align: 'tl-tr',
                anchorToTarget: true,
                anchor: true,
                autoHide: false,
                closable: true
            }
        }, {
            text: 'Anchor below',
            tooltip: {
                html: 'The anchor is centered',
                anchorToTarget: true,
                align: 'tc-bc',
                anchor: true
            }
        }, {
            text: 'Anchor with tracking',
            tooltip: {
                html: 'Following the mouse with an anchor',
                trackMouse: true,
                align: 'l-r',
                anchor: true
            }
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
            html: '<div data-qtip="Aligned top" data-qalign="bl-tl" data-qanchorToTarget="true">Inline tip align top</div>'
        }]
    }]
});
