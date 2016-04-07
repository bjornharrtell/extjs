/**
 * An area chart with negative values.
 */
Ext.define('KitchenSink.view.charts.area.Negative', {
    extend: 'Ext.Panel',
    xtype: 'area-negative',
    controller: 'area-negative',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/area/NegativeController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Earnings.js'
    }],
    // </example>
    width: 650,

    tbar: [
        '->',
        {
            text: 'Preview',
            handler: 'onPreview'
        }
    ],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        insetPadding: '40 40 10 40',
        store: {
            type: 'earnings'
        },
        legend: {
            docked: 'bottom'
        },
        sprites: [{
            type: 'text',
            text: 'Profits and Losses (per product category)',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['consumer', 'gaming', 'phone', 'corporate'],
            grid: true
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'quarter',
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }]
        // No 'series' config here,
        // as series are dynamically added in the controller.
        //<example>
    }, {
        style: 'margin-top: 10px;',
        xtype: 'gridpanel',
        columns : {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [
                { text: 'Quarter', dataIndex: 'quarter' },
                { text: 'Consumer', dataIndex: 'consumer'},
                { text: 'Gaming', dataIndex: 'gaming'},
                { text: 'Phone', dataIndex: 'phone'},
                { text: 'Corporate', dataIndex: 'corporate'}
            ]
        },
        store: {type: 'earnings'},
        width: '100%'
        //</example>
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
