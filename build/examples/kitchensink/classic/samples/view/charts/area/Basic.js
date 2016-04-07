/**
 * A basic area chart is similar to the line chart, except the area between axis and line
 * is filled with colors to emphasize quantity.
 */
Ext.define('KitchenSink.view.charts.area.Basic', {
    extend: 'Ext.Panel',
    xtype: 'area-basic',
    controller: 'area-basic',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/area/BasicController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/GDP.js'
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
        height: 600,
        insetPadding: '40 40 40 40',
        store: {
            type: 'gdp'
        },
        legend: {
            docked: 'bottom'
        },
        sprites: [{
            type: 'text',
            text: 'Economic Development in the USA, Japan and China',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Gross domestic product based on purchasing-power-parity (PPP) valuation of country GDP. Figures for FY2014 are forecasts.',
            fontSize: 10,
            x: 12,
            y: 525
        }, {
            type: 'text',
            text: 'Source: http://www.imf.org/ World Economic Outlook Database October 2014.',
            fontSize: 10,
            x: 12,
            y: 540
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['china', 'japan', 'usa'],
            title: 'GDP in billions of US Dollars',
            grid: true,
            minimum: 0,
            maximum: 20000,
            majorTickSteps: 10,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'year',
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
                { text: 'Year', dataIndex: 'year' },
                { text: 'China', dataIndex: 'china'},
                { text: 'Japan', dataIndex: 'japan'},
                { text: 'USA', dataIndex: 'usa'}
            ]
        },
        store: {type: 'gdp'},
        width: '100%'
        //</example>
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
