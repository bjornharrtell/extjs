/**
 *
 * This example shows how to create a pivot grid and display the results in
 * an outline layout.
 *
 */
Ext.define('KitchenSink.view.pivot.LayoutOutline', {
    extend: 'Ext.pivot.Grid',
    xtype: 'outline-pivot-grid',
    controller: 'pivotlayout',

    requires: [
        'KitchenSink.store.pivot.Sales',
        'KitchenSink.view.pivot.LayoutController'
    ],

    title: 'Outline layout',
    collapsible: true,
    multiSelect: true,
    height: 350,

    store: {
        type: 'sales'
    },
    selModel: {
        type: 'rowmodel'
    },

    // Set layout type to "outline". If this config is missing then the default layout is "outline"
    viewLayoutType: 'outline',

    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    startRowGroupsCollapsed: false,

    // Configure the aggregate dimensions. Multiple dimensions are supported.
    aggregate: [{
        dataIndex:  'value',
        header:     'Sum of value',
        aggregator: 'sum',
        width:      90
    }],

    // Configure the left axis dimensions that will be used to generate the grid rows
    leftAxis: [{
        dataIndex:  'person',
        header:     'Person',
        width:      80
    },{
        dataIndex:  'company',
        header:     'Company',
        sortable:   false,
        width:      80
    }],

    /**
     * Configure the top axis dimensions that will be used to generate the columns.
     * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
     * are defined then each top axis result will have in the end a column header with children
     * columns for each aggregate dimension defined.
     */
    topAxis: [{
        dataIndex:  'country',
        header:     'Country'
    }],

    tbar: [{
        text: 'Collapsing',
        menu: [{
            text: 'Collapse all',
            handler: 'collapseAll'
        },{
            text: 'Expand all',
            handler: 'expandAll'
        }]
    },{
        text: 'Subtotals position',
        menu: {
            defaults: {
                xtype: 'menucheckitem',
                group:  'subtotals',
                checkHandler: 'subtotalsHandler'
            },
            items: [{
                text: 'First',
                checked: true
            },{
                text: 'Last'
            },{
                text: 'None'
            }]
        }
    },{
        text: 'Totals position',
        menu: {
            defaults: {
                xtype: 'menucheckitem',
                group:  'totals',
                checkHandler: 'totalsHandler'
            },
            items: [{
                text: 'First'
            },{
                text: 'Last',
                checked: true
            },{
                text: 'None'
            }]
        }
    }],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/pivot/LayoutController.js'
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
