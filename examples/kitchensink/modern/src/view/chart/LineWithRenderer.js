/**
 * Demonstrates how to use Ext.chart.series.Line with a renderer function
 */
Ext.define('KitchenSink.view.chart.LineWithRenderer', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart', 
        'Ext.chart.series.Line', 
        'Ext.chart.axis.Numeric', 
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time', 
        'Ext.chart.interactions.ItemHighlight'
    ],
    controller: 'renderer',

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/chart/RendererController.js'
    }, {
        type: 'Store',
        path: 'modern/src/store/Pie.js' 
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
            iconCls: 'x-fa fa-refresh',
            text: 'Refresh',
            handler: 'onRefresh'
        }]
    }, {
        xtype: 'cartesian',
        reference: 'chart',
        store: {
            type: 'pie',
            numRecords: 10
        },
        background: 'white',
        series: [{
            type: 'line',
            xField: 'name',
            yField: 'g1',
            style: {
                strokeStyle: 'powderblue',
                fillStyle: 'aliceblue',
                lineWidth: 4
            },
            marker: {
                type: 'circle',
                fillStyle: 'yellow',
                radius: 10
            },
            renderer: function(sprite, config, rendererData, index) {
                var store = rendererData.store,
                    storeItems = store.getData().items,
                    currentRecord = storeItems[index],
                    previousRecord = (index > 0 ? storeItems[index - 1] : currentRecord),
                    current = currentRecord && currentRecord.data['g1'],
                    previous = previousRecord && previousRecord.data['g1'],
                    changes = {};

                switch (config.type) {
                    case 'marker':
                        if (index == 0) {
                            return null; // keep the default style for the first marker
                        }
                        changes.strokeStyle = (current >= previous ? 'green' : 'red');
                        changes.fillStyle = (current >= previous ? 'palegreen' : 'lightpink');
                        changes.lineWidth = 2;
                        break;
                    case 'line':
                        changes.strokeStyle = (current >= previous ? 'green' : 'red');
                        changes.fillStyle = (current >= previous ? 'palegreen' : 'tomato');
                        changes.fillOpacity = .1;
                        break;
                }
                return changes;
            }



        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['g1'],
            minimum: 0
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'name'
        }]
    }]
});
