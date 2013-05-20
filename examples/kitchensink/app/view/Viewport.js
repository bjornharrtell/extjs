Ext.define('KitchenSink.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    layout: 'border',

    items: [{
        region: 'north',
        xtype: 'appHeader'
    }, {
        region: 'west',
        xtype: 'navigation',
        width: 250,
        split: true,
        stateful: true,
        stateId: 'mainnav.west',
        collapsible: true
    }, {
        region: 'center',
        xtype: 'contentPanel'
    }, {
        region: 'east',
        id: 'east-region',
        title: 'Example Info',
        stateful: true,
        stateId: 'mainnav.east',
        split: true,
        collapsible: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        width: 250,
        items: [{
            xtype: 'descriptionPanel',
            stateful: true,
            stateId: 'mainnav.east.description',
            height: 200
        }, {
            xtype: 'splitter',
            collapsible: true,
            collapseTarget: 'prev'
        }, {
            xtype: 'codePreview',
            flex: 1
        }]
    }]
});