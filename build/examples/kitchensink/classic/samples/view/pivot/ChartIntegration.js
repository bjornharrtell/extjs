/**
 *
 * This example shows how to create a pivot grid and integrate it with Sencha Charts.
 *
 */
Ext.define('KitchenSink.view.pivot.ChartIntegration', {
    extend: 'Ext.panel.Panel',
    xtype: 'chart-pivot-grid',
    controller: 'chartintegration',

    requires: [
        'KitchenSink.store.pivot.Sales',
        'KitchenSink.view.pivot.ChartIntegrationController'
    ],

    title: 'Pivot Grid with chart integration',
    collapsible: true,
    height: 450,
    layout: 'border',

    items: [{
        xtype: 'pivotgrid',
        region: 'center',
        flex: 1,

        store: {
            type: 'sales'
        },
        selModel: {
            type: 'cellmodel'
        },

        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex:  'value',
            header:     'Sum of value',
            aggregator: 'sum',
            flex:       1
        }],

        // Configure the left axis dimensions that will be used to generate the grid rows
        leftAxis: [{
            dataIndex:  'person',
            header:     'Person',
            flex:       1
        }],


        // Configure the top axis dimensions that will be used to generate the columns.
        // When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
        // are defined then each top axis result will have in the end a column header with children
        // columns for each aggregate dimension defined.
        topAxis: [{
            dataIndex:  'year',
            header:     'Year'
        }],

        listeners: {
            pivotdone: 'onPivotDone'
        }
    }],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/ChartIntegrationController.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/pivot/Sale.js'
    },{
        type: 'Store',
        path: 'classic/samples/store/pivot/Sales.js'
    }],
    profiles: {
        classic: {
            width: 600
        },
        neptune: {
            width: 750
        }
    },
    //</example>

    initComponent: function () {
        var me = this;

        me.width = me.profileInfo.width;

        me.callParent();
    }
});
