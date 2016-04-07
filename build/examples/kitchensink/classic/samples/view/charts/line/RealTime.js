Ext.define('KitchenSink.view.charts.line.RealTime', {
    extend: 'Ext.tab.Panel',
    xtype: 'line-real-time',
    controller: 'line-real-time',

    // <example>
    // Content between example tags is omitted from code preview.
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/line/RealTimeController.js'
    }],
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>

    width: 650,

    items: [{
        title: 'Time Axis',
        layout: 'fit',
        items: {
            xtype: 'cartesian',
            reference: 'time-chart',
            insetPadding: '40 40 20 20',
            width: '100%',
            height: 500,
            store: Ext.create('Ext.data.JsonStore', {
                fields: ['yValue', 'metric1', 'metric2']
            }),
            axes: [{
                type: 'numeric',
                minimum: 0,
                maximum: 20,
                grid: true,
                position: 'left',
                title: 'Number of Hits'
            }, {
                type: 'time',
                dateFormat: 'G:i:s',
                segmenter: {
                    type: 'time',
                    step: {
                        unit: Ext.Date.SECOND,
                        step: 1
                    }
                },
                label: {
                    fontSize: 10
                },
                grid: true,
                position: 'bottom',
                title: 'Seconds',
                fields: ['xValue'],
                majorTickSteps: 10
            }],
            series: [{
                type: 'line',
                title: 'Metric 1',
                marker: {
                    type: 'cross',
                    size: 5
                },
                style: {
                    miterLimit: 0
                },
                xField: 'xValue',
                yField: 'metric1'
            }, {
                type: 'line',
                title: 'Metric 2',
                marker: {
                    type: 'arrow',
                    size: 5
                },
                style: {
                    miterLimit: 0
                },
                xField: 'xValue',
                yField: 'metric2'
            }],
            listeners: {
                afterrender: 'onTimeChartRendered',
                destroy: 'onTimeChartDestroy'
            }
        }
    }, {
        title: 'Numeric Axis',
        itemId: 'numeric',
        layout: 'fit',
        items: {
            xtype: 'cartesian',
            reference: 'number-chart',
            insetPadding: '40 40 20 20',
            width: '100%',
            height: 500,
            store: Ext.create('Ext.data.JsonStore', {
                fields: ['yValue', 'xValue']
            }),
            axes: [{
                type: 'numeric',
                minimum: 0,
                maximum: 100,
                grid: true,
                position: 'left',
                title: 'Number of Hits'
            }, {
                type: 'numeric',
                grid: true,
                position: 'bottom',
                title: 'Seconds',
                fields: ['xValue'],
                style: {
                    textPadding: 0
                },
                renderer: 'onAxisLabelRender'
            }],
            series: [{
                type: 'line',
                title: 'Values',
                label: {
                    display: 'over',
                    field: 'yValue'
                },
                marker: {
                    radius: 4
                },
                style: {
                    lineWidth: 4,
                    miterLimit: 0
                },
                xField: 'xValue',
                yField: ['yValue']
            }],
            listeners: {
                afterrender: 'onNumberChartRendered',
                destroy: 'onNumberChartDestroy'
            }
        }
    }],

    listeners: {
        tabchange: 'onTabChange'
    }

});
