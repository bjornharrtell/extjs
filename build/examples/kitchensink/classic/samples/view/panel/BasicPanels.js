/**
 * This example shows how to create basic panels. Panels typically have a header and a body,
 * although the header is optional. The panel header can contain a title, and icon, and
 * one or more tools for performing specific actions when clicked.
 */
Ext.define('KitchenSink.view.panel.BasicPanels', {
    extend: 'Ext.Container',
    xtype: 'basic-panels',

    requires: [
        'Ext.layout.container.Table'
    ],

    //<example>
    profiles: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    width: 660,
    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 10px; vertical-align: top;' }
    },

    defaults: {
        xtype: 'panel',
        width: 200,
        height: 280,
        bodyPadding: 10
    },

    items: [{
        html: KitchenSink.DummyText.mediumText
    }, {
        title: 'Title',
        html: KitchenSink.DummyText.mediumText
    }, {
        title: 'Collapsible',
        collapsible: true,
        html: KitchenSink.DummyText.mediumText
    }, {
        title: 'Built in Tools',
        collapsed: true,
        collapsible: false,
        width: 640,
        html: KitchenSink.DummyText.mediumText,
        tools: [
            { type: 'pin' },
            { type: 'refresh' },
            { type: 'search' },
            { type: 'save' }
        ],
        colspan: 3
    }, {
        title: 'Custom Tools using iconCls',
        collapsed: true,
        collapsible: false,
        width: 640,
        html: KitchenSink.DummyText.mediumText,
        tools: [
            { iconCls: 'x-fa fa-wrench' },
            { iconCls: 'x-fa fa-reply' },
            { iconCls: 'x-fa fa-reply-all' },
            { iconCls: 'x-fa fa-rocket' }
        ],
        colspan: 3
    },
    {
        title: 'Custom Tools using glyph configuration',
        collapsed: true,
        collapsible: false,
        width: 640,
        html: KitchenSink.DummyText.mediumText,
        tools: [
            { glyph: 'xf0ad@FontAwesome' },
            { glyph: 'xf112@FontAwesome' },
            { glyph: 'xf122@FontAwesome' },
            { glyph: 'xf135@FontAwesome' }
        ],
        colspan: 3
    }]
});
