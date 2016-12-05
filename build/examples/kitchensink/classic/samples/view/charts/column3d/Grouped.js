/**
 * Grouped 3D Columns are column charts where categories are grouped next to each
 * other. This is typically done to visually represent the total of all categories for a
 * given period or value.
 */
Ext.define('KitchenSink.view.charts.column3d.Grouped', {
    extend: 'Ext.Panel',
    xtype: 'column-grouped-3d',
    requires: ['Ext.chart.theme.Muted'],
    controller: 'column-grouped-3d',
    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/column3d/GroupedController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/TwoYearSales.js'
    }],
    // </example>
    width: 650,

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 400,
        theme: 'Muted',
        insetPadding: '70 40 0 40',
        interactions: ['itemhighlight'],
        animation: {
            duration: 200
        },
        store: {
            type: 'two-year-sales'
        },
        legend: true,
        sprites: [{
            type: 'text',
            text: 'Sales in Last Two Years',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            width: 100,
            height: 30,
            x: 325, // the sprite x position
            y: 30  // the sprite y position
        }, {
            type: 'text',
            text: 'Quarter-wise comparison',
            textAlign: 'center',
            fontSize: 16,
            x: 325,
            y: 50
        }, {
            type: 'text',
            text: 'Source: http://www.w3schools.com/',
            fontSize: 10,
            x: 12,
            y: 495
        }],
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: ['2013', '2014'],
            grid: true,
            title: 'Sales in USD',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'quarter',
            title: {
                text: 'Quarter',
                translationX: -30
            },
            grid: true
        }],
        series: {
            type: 'bar3d',
            stacked: false,
            title: ['Previous Year', 'Current Year'],
            xField: 'quarter',
            yField: ['2013', '2014'],
            label: {
                field: ['2013', '2014'],
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            highlight: true,
            style: {
                inGroupGapWidth: -7
            }
        }
        //<example>
    }, {
        style: 'margin-top: 10px;',
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        width: '100%',
        items: [{
            xtype: 'gridpanel',
            width: 300,
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: 'onGridColumnRender'
                },
                items: [
                    { text: 'Quarter', dataIndex: 'quarter', renderer: Ext.identityFn },
                    { text: '2013', dataIndex: '2013' },
                    { text: '2014', dataIndex: '2014' }
                ]
            },
            store: {
                type: 'two-year-sales'
            }
        }]
        //</example>
    }]

});
