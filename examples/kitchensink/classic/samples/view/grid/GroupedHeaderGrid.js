/**
 * This example shows how to create a grid with column headers which are nested within
 * category headers.
 *
 * Category headers do not reference Model fields via a `dataIndex`, rather they contain
 * child header definitions (which may themselves either contain a `dataIndex` or more
 * levels of headers).
 */
Ext.define('KitchenSink.view.grid.GroupedHeaderGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'grouped-header-grid',
    controller: 'basicgrid',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/BasicGridController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    },{
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 600,
            changeColumnWidth: 80,
            lastUpdatedColumnWidth: 85,
            percentChangeColumnWidth: 75,
            green: 'green',
            red: 'red'
        },
        neptune: {
            width: 675,
            changeColumnWidth: 80,
            lastUpdatedColumnWidth: 115,
            percentChangeColumnWidth: 100,
            green: '#73b51e',
            red: '#cf4c35'
        },
        'neptune-touch': {
            width: 720,
            changeColumnWidth: 90,
            lastUpdatedColumnWidth: 125,
            percentChangeColumnWidth: 115
        }
    },
    //</example>

    title: 'Grouped Header Grid',
    width: '${width}',
    height: 350,

    columnLines: true,
    signTpl: '<span style="' +
            'color:{value:sign(\'${red}\',\'${green}\')}"' +
        '>{text}</span>',

    store: {
        type: 'companies',
        sorters: {
            property:'name',
            direction: 'DESC'
        }
    },

    columns: [{
        text: 'Company',
        dataIndex: 'name',

        flex: 1,
        sortable: true
    }, {
        text: 'Stock Price',

        columns: [{
            text: 'Price',
            dataIndex: 'price',

            width: 75,
            sortable: true,
            formatter: 'usMoney'
        }, {
            text: 'Change',
            dataIndex: 'change',

            width: '${changeColumnWidth}',
            sortable: true,
            renderer: 'renderChange'
        }, {
            text: '% Change',
            dataIndex: 'pctChange',

            width: '${percentChangeColumnWidth}',
            sortable: true,
            renderer: 'renderPercent'
        }]
    }, {
        text: 'Last Updated',
        dataIndex: 'lastChange',

        width: '${lastUpdatedColumnWidth}',
        sortable: true,
        formatter: 'date("m/d/Y")'
    }]
});
