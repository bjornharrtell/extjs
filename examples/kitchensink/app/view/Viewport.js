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
        minWidth: 100,
        height: 200,
        split: true,
        stateful: true,
        stateId: 'mainnav.west',
        collapsible: true,
        tools: [{
            type: 'gear',
            regionTool: true
        }]
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
        height: 200,
        minWidth: 100,
        tools: [{
            type: 'gear',
            regionTool: true
        }],
        items: [{
            xtype: 'descriptionPanel',
            stateful: true,
            stateId: 'mainnav.east.description',
            height: 200,
            minHeight: 100
        }, {
            xtype: 'splitter',
            collapsible: true,
            collapseTarget: 'prev'
        }, {
            xtype: 'codePreview',
            flex: 1//,
            //minHeight: 100
        }]
    }]
});