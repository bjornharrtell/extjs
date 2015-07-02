/**
 * 100% stacked 3D bars are bar charts where categories are stacked
 * on top of each other. The value of each category is recalculated so that
 * it represents a share of the whole, which is the full stack and is equal
 * to 100 by default.
 */
Ext.define('KitchenSink.view.charts.bar3d.Stacked100', {
    extend: 'Ext.Panel',
    xtype: 'bar-stacked-100-3d',
    controller: 'bar-stacked-100-3d',
    requires: ['Ext.chart.theme.Muted'],

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/bar3d/Stacked100Controller.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Browsers.js'
    }],
    // </example>
    width: 650,

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        theme: 'Muted',
        width: '100%',
        height: 500,
        legend: {
            docked: 'right'
        },
        animation: Ext.isIE8 ? false : {
            easing: 'backOut',
            duration: 500
        },
        store: {type: 'browsers'},
        insetPadding: 40,
        flipXY: true,
        axes: [{
            type: 'numeric3d',
            position: 'bottom',
            grid: true,
            minimum: 0,
            maximum: 100,
            majorTickSteps: 10,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            position: 'left',
            grid: true
        }],
        series: [{
            type: 'bar3d',
            fullStack: true,
            title: [ 'IE', 'Firefox', 'Chrome', 'Safari', 'Others' ],
            xField: 'month',
            yField: [ 'data1', 'data2', 'data3', 'data4', 'other' ],
            axis: 'bottom',
            stacked: true,
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }],
        sprites: [{
            type: 'text',
            text: 'Bar Charts - 100% Stacked Bars',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Browser Stats 2012',
            fontSize: 10,
            x: 12,
            y: 480
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 495
        }]
        //<example>
    }, {
        style: 'margin-top: 10px;',
        xtype: 'gridpanel',
        columns: {
            defaults: {
                sortable: false,
                menuDisabled: true,
                renderer: 'onColumnRender'
            },
            items: [
                { text: 'Month', dataIndex: 'month', renderer: Ext.identityFn },
                { text: 'IE', dataIndex: 'data1' },
                { text: 'Firefox', dataIndex: 'data2' },
                { text: 'Chrome', dataIndex: 'data3' },
                { text: 'Safari', dataIndex: 'data4' },
                { text: 'Other', dataIndex: 'other' }
            ]
        },
        store: {type: 'browsers'},
        width: '100%'
        //</example>
    }],

    tbar: [
        '->',
        {
            text: 'Preview',
            handler: 'onPreview'
        }
    ]
});
