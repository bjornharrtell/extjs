/**
 *
 * This example shows how to create a pivot grid and let your end users
 * configure it.
 *
 */
Ext.define('KitchenSink.view.pivot.Configurator', {
    extend: 'Ext.pivot.Grid',
    xtype: 'configurable-pivot-grid',
    controller: 'pivotconfig',

    requires: [
        'KitchenSink.view.pivot.ConfiguratorController',
        'KitchenSink.store.pivot.Sales',
        'Ext.pivot.plugin.Configurator'
    ],

    title: 'Pivot Grid with Configurator plugin',
    collapsible: true,
    multiSelect: true,
    height: 350,

    store: {
        type: 'sales'
    },
    selModel: {
        type: 'spreadsheet'
    },

    plugins: [{
        ptype:      'pivotconfigurator',
        pluginId:   'configurator',
        // It is possible to configure a list of fields that can be used to configure the pivot grid
        // If no fields list is supplied then all fields from the Store model are fetched automatically
        fields: [{
            dataIndex:  'country',
            header:     'Country'
        }, {
            dataIndex:  'quantity',
            header:     'Qty',
            // You can even provide a default aggregator function to be used when this field is dropped
            // on the agg dimensions
            aggregator: 'min'
        }, {
            dataIndex:  'month',
            header:     'Month',
            renderer: function(v, meta){
                // This field can be dragged onto leftAxis or topAxis.
                // When added to the topAxis the renderer is used to generate the column text, which
                // means that only the value is passed to the function.
                // When added to the leftAxis the renderer is called twice, once to generate the
                // row labels and once by the grid panel so you can style the cell.
                // To style an aggregated cell you need to add the renderer to the aggregate dimension.
                return meta ? v : Ext.Date.monthNames[v];
            }
        }]
    }],

    // Configure the aggregate dimensions. Multiple dimensions are supported.
    aggregate: [{
        dataIndex:  'value',
        header:     'Value',
        aggregator: 'avg'
    }],

    // Configure the left axis dimensions that will be used to generate the grid rows
    leftAxis: [{
        dataIndex:  'person',
        header:     'Person'
    },{
        dataIndex:  'company',
        header:     'Company',
        sortable:   false
    }],

    /**
     * Configure the top axis dimensions that will be used to generate the columns.
     * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
     * are defined then each top axis result will have in the end a column header with children
     * columns for each aggregate dimension defined.
     */
    topAxis: [{
        dataIndex:  'year',
        header:     'Year'
    }],

    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            text: 'Dock',
            menu: {
                defaults: {
                    xtype: 'menucheckitem',
                    group:  'docking',
                    checkHandler: 'changeDock'
                },
                items: [{
                    text: 'Top'
                },{
                    text: 'Right',
                    checked: true
                },{
                    text: 'Bottom'
                },{
                    text: 'Left'
                }]
            }
        }]
    },

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/ConfiguratorController.js'
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
