/**
 * This example shows how to create a grid from a store. The grid is stateful so you
 * can move or hide columns, reload the page, and come back to the grid in the same state
 * you left it in.
 *
 * The cells are selectable due to use of the `enableTextSelection` option.
 *
 * It uses an ActionColumn to display clickable icons which are linked to controller methods.
 */
Ext.define('KitchenSink.view.grid.BasicGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'array-grid',
    controller: 'basicgrid',

    requires: [
        'Ext.grid.column.Action'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/BasicGridController.js'
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
            width: 750,
            priceWidth: 95,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115,
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>

    title: 'Basic Grid',
    width: '${width}',
    height: 350,

    store: 'Companies',
    stateful: true,
    collapsible: true,
    multiSelect: true,
    stateId: 'stateGrid',
    headerBorders: false,
    signTpl: '<span style="' +
            'color:{value:sign(\'${red}\',\'${green}\')}"' +
        '>{text}</span>',

    viewConfig: {
        enableTextSelection: true
    },

    // Reusable actions
    actions: {
        sell: {
            iconCls: 'array-grid-sell-col',
            tooltip: 'Sell stock',
            handler: 'onSellClick'
        },
        buy: {
            getClass: 'getBuyClass',
            getTip: 'getBuyTip',
            handler: 'onBuyClick'
        },
        suspendTrading: {
            tooltip: 'Toggles enabled status of all buy and sell actions anywhere in this view',
            text: 'Suspend Trading',
            glyph: 'xf256@FontAwesome',
            toggleHandler: 'onToggleTrading',
            enableToggle: true
        }
    },

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
        text: '% Change',
        width: '${percentChangeColumnWidth}',
        sortable: true,
        renderer: 'renderPercent',
        dataIndex: 'pctChange'
    }, {
        text: 'Last Updated',
        width: '${lastUpdatedColumnWidth}',
        sortable: true,
        formatter: 'date("m/d/Y")',
        dataIndex: 'lastChange'
    }, {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 50,
        items: ['@sell', '@buy']
    }],

    bbar: [
        '@suspendTrading'
    ]
});
