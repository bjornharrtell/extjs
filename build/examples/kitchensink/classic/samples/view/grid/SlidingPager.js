/**
 * This example demonstrates using a custom paging display.
 */
Ext.define('KitchenSink.view.grid.SlidingPager', {
    extend: 'Ext.grid.Panel',
    xtype: 'sliding-pager',
    controller: 'basicgrid',

    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager'
    ],

    //<example>
    otherContent: [{
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 600,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85,
            green: 'green',
            red: 'red'
        },
        neptune: {
            width: 650,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115,
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>
    
    title: 'Sliding Pager',
    height: 460,
    width: '${width}',

    autoLoad: true,
    frame: true,
    store: {
        type: 'companies',
        pageSize: 10,
        remoteSort: true
    },
    signTpl: '<span style="' +
            'color:{value:sign(\'${red}\',\'${green}\')}"' +
        '>{text}</span>',

    columns: [{
        text: 'Company',
        dataIndex: 'name',

        sortable: true,
        flex: 1
    },{
        text: 'Price',
        dataIndex: 'price',

        sortable: true,
        formatter: 'usMoney',
        width: 75
    },{
        text: 'Change',
        dataIndex: 'change',

        sortable: true,
        renderer: 'renderChange',
        width: 80
    },{
        text: '% Change',
        dataIndex: 'pctChange',

        sortable: true,
        renderer: 'renderPercent',
        width: '${percentChangeColumnWidth}'
    },{
        text: 'Last Updated',
        dataIndex: 'lastChange',

        sortable: true,
        formatter: 'date("m/d/Y")',
        width: '${lastUpdatedColumnWidth}'
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        plugins: {
            ptype: 'ux-slidingpager'
        }
    }
});
