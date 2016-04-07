/**
 * Pareto chart, named after Vilfredo Pareto, is a chart that contains both column and
 * line chart. Individual values are represented in descending order by bars, and the
 * cumulative total is represented by the line.
 */
Ext.define('KitchenSink.view.charts.combination.Pareto', {
    extend: 'Ext.Panel',
    requires: 'Ext.chart.theme.Category2',
    xtype: 'combination-pareto',
    controller: 'combination-pareto',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/combination/ParetoController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Pareto.js'
    }],
    // </example>
    width: 650,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            {
                text: Ext.os.is.Desktop ? 'Download' : 'Preview',
                handler: 'onDownload'
            }]
    }],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        theme: 'category2',
        width: '100%',
        height: 500,
        store: {
            type: 'pareto'
        },
        insetPadding: '40 40 20 40',
        legend: {
            docked: 'bottom'
        },
        sprites: [{
            type: 'text',
            text: 'Restaurant Complaints by Reported Cause',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Data: Restaurant Complaints',
            font: '10px Helvetica',
            x: 12,
            y: 480
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['count'],
            majorTickSteps: 10,
            reconcileRange: true,
            grid: true,
            minimum: 0
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'complaint',
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }, {
            type: 'numeric',
            position: 'right',
            fields: ['cumnumber'],
            reconcileRange: true,
            majorTickSteps: 10,
            renderer: 'onAxisLabelRender'
        }],
        series: [{
            type: 'bar',
            title: 'Causes',
            xField: 'complaint',
            yField: 'count',
            style: {
                opacity: 0.80
            },
            highlight: {
                fillStyle: 'rgba(204, 230, 73, 1.0)',
                strokeStyle: 'black'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onBarSeriesTooltipRender'
            }
        }, {
            type: 'line',
            title: 'Cumulative %',
            xField: 'complaint',
            yField: 'cumnumber',
            style: {
                lineWidth: 2,
                opacity: 0.80
            },
            marker: {
                type: 'cross',
                fx: {
                    duration: 200
                }
            },
            highlightCfg: {
                scaling: 2,
                rotationRads: Math.PI / 4
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onLineSeriesTooltipRender'
            }
        }]
        //<example>
    }, {
        style: 'padding-top: 10px;',
        xtype: 'gridpanel',
        columns : {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [
                { text: 'Complaint', dataIndex: 'complaint', width: 175 },
                { text: 'Count', dataIndex: 'count' },
                { text: 'Cumulative', dataIndex: 'cumnumber' },
                { text: 'Cumulative %', dataIndex: 'cumpercent', width: 175, renderer: 'onPercentRender' }
            ]
        },
        store: {
            type: 'pareto'
        },
        width: '100%'
        //</example>
    }]

});
