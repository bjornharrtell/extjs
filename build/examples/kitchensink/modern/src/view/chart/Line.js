/**
 * Demonstrates how to use Ext.chart.series.Line
 */
Ext.define('KitchenSink.view.chart.Line', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom'
    ],

    controller: 'chart',

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/chart/ChartController.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/USD2EUR.js' 
    }],
    // </example>
    
    layout: 'fit',
    shadow: true,

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        cls: 'charttoolbar',
        items: [{
            xtype: 'spacer'
        }, {
            iconCls: 'x-fa fa-picture-o',
            text: 'Theme',
            handler: 'onThemeChange'
        }]
    }, {
        xtype: 'cartesian',
        store: 'USD2EUR',
        background: 'white',
        interactions: [{
            type: 'crosszoom',
            zoomOnPanGesture: false
        }],
        series: [{
            type: 'line',
            xField: 'time',
            yField: 'value',
            fill: true,
            style: {
                fillOpacity: 0.4,
                miterLimit: 3,
                lineCap: 'miter',
                lineWidth: 2
            }
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['value'],
            title: {
                text: 'USD to Euro',
                fontSize: 20
            }
        }, {
            type: 'time',
            dateFormat: 'Y-m-d',
            visibleRange: [0, 1],
            position: 'bottom',
            fields: 'time',
            title: {
                text: 'Date',
                fontSize: 20
            }
        }]
    }],
    
    initialize: function() {
        this.callParent();
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        if (toolbar && interaction) {
            toolbar.add(interaction.getUndoButton());
        }
    }
});
