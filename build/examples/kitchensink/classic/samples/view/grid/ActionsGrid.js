/**
 * This example shows how to create multiple active UI event handling widgets
 * from a single Action definition.
 *
 * Both Buttons and MenuItems can be created from the same Action instance.
 * Action's enable, disable, hide, show and setText methods affect every Component
 * created from that Action.
 *
 * In this example, the Action is disabled when there is no grid selection
 * (spacebar deselects), and this disables both Buttons and MenuItems.
 */
Ext.define('KitchenSink.view.grid.ActionsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'actions-grid',
    controller: 'actionsgrid',

    requires: [
        'Ext.Action'
    ],

    title: 'Actions Grid',
    store: 'Companies',
    width: '${width}',
    height: 350,

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/ActionsGridController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 600,
            priceWidth: 75,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85,
            green: 'green',
            red: 'red'
        },
        neptune: {
            width: 700,
            priceWidth: 95,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115,
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>

    viewConfig: {
        listeners: {
            itemcontextmenu: 'onGridContextMenu',
            selectionchange: 'onSelectionChange'
        }
    },
    
    // Clearing selection disables the Actions.
    allowDeselect: true,
    defaultActionType: 'button',
    actions: {
        buy: {
            iconCls: 'array-grid-buy-col',
            text: 'Buy stock',
            disabled: true,
            handler: 'handleBuyAction'  // see Controller
        },
        sell: {
            iconCls: 'array-grid-sell-col',
            text: 'Sell stock',
            disabled: true,
            handler: 'handleSellAction'
        }
    },

    tbar: [
        // Actions can be converted into Buttons.
        '@buy', '@sell'
    ],

    columns: [{
        text: 'Company',
        flex: 1,
        sortable: false,
        dataIndex: 'name'
    }, {
        text: 'Price',
        width: '${priceWidth}',
        sortable: true,
        formatter: 'usMoney',
        dataIndex: 'price'
    }, {
        text: 'Change',
        width: 80,
        sortable: true,
        renderer: 'renderChange',
        dataIndex: 'change'
    }, {
        text: 'Change',
        width: 80,
        sortable: true,
        renderer: 'renderChange',
        dataIndex: 'change'
    }, {
        text: '% Change',
        width: '${percentChangeColumnWidth}',
        sortable: true,
        renderer: 'renderPctChange',
        dataIndex: 'pctChange'
    }, {
        text: 'Last Updated',
        width: '${lastUpdatedColumnWidth}',
        sortable: true,
        formatter: 'date("m/d/Y")',
        dataIndex: 'lastChange'
    }]
});
