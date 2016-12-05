/**
 * This example shows how to use the grouping feature of the Grid.
 */
Ext.define('KitchenSink.view.grid.GroupedGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'grouped-grid',
    controller: 'grouped-grid',
    
    requires: [
        'Ext.grid.feature.Grouping'
    ],
    
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/GroupedGridController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Restaurants.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/Restaurant.js'
    }],
    profiles: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    title: 'Restaurants',
    width: 600,
    height: 400,

    bind: '{restaurants}',
    collapsible: true,
    collapseFirst: false,
    frame: true,
    minHeight: 200,

    tools: [{
        type: 'plus',
        handler: 'onExpandAll',
        tooltip: 'Expand all groups',
        bind: {
            hidden: '{!groupBy}'
        }
    }, {
        type: 'minus',
        handler: 'onCollapseAll',
        tooltip: 'Collapse all groups',
        bind: {
            hidden: '{!groupBy}'
        }
    }],

    columns: [{
        text: 'Name',
        dataIndex: 'name',

        flex: 1
    },{
        text: 'Cuisine',
        dataIndex: 'cuisine',

        flex: 1
    }],

    features: [{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
    }],

    viewModel: {
        data: {
            groupBy: null
        },
        stores: {
            restaurants: {
                type: 'restaurants',
                autoLoad: false,
                listeners: {
                    groupchange: 'onGroupChange',
                    buffer: 100
                }
            }
        }
    },

    viewConfig: {
        listeners: {
            groupcollapse: 'onGroupCollapse',
            groupexpand: 'onGroupExpand'
        }
    },

    tbar: ['->', {
        text: 'Toggle groups...',
        reference: 'groupsBtn',

        bind: {
            disabled: '{!groupBy}'
        },
        destroyMenu: true,
        menu: {
            hideOnScroll: false,
            items: []
        }
    }],

    fbar: [{
        text: 'Clear Grouping',
        handler: 'onClearGroupingClick',
        bind: {
            disabled: '{!groupBy}'
        }
    }]
});
