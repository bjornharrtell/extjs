/**
 * This example demonstrates using a custom paging display.
 */
Ext.define('KitchenSink.view.grid.ProgressBarPager', {
    extend: 'Ext.grid.Panel',
    xtype: 'progress-bar-pager',
    controller: 'basicgrid',
    
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
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

    title: 'Progress Bar Pager',
    width: '${width}',
    height: 320,
    
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
        
        width: 80,
        sortable: true,
        renderer: 'renderChange'
    },{
        text: '% Change',
        dataIndex: 'pctChange',
        
        width: '${percentChangeColumnWidth}',
        sortable: true,
        renderer: 'renderPercent'
    },{
        text: 'Last Updated',
        dataIndex: 'lastChange',

        width: '${lastUpdatedColumnWidth}',
        sortable: true,
        formatter: 'date("m/d/Y")'
    }],
    
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        plugins: 'ux-progressbarpager'
    }
});
