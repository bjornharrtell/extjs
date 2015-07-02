Ext.define('KitchenSink.view.grid.CheckboxSelection', {
    extend: 'Ext.grid.Panel',

    xtype: 'checkbox-selection',
    store: 'Companies',

    selType: 'checkboxmodel',
    columns: [
        {text: "Company", width: 300, dataIndex: 'name'},
        {text: "Price", formatter: 'usMoney', dataIndex: 'price'},
        {text: "Change", dataIndex: 'change'},
        {text: "% Change", dataIndex: 'pctChange'},
        {text: "Last Updated", width: 120, formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
    ],
    columnLines: true,
    height: 300,
    frame: true,
    title: 'Framed with Checkbox Selection and Horizontal Scrolling',
    //<example>
    exampleTitle: 'Framed with Checkbox Selection and Horizontal Scrolling',
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 700
        },
        neptune: {
            width: 750
        }
    },
    //</example>

    initComponent: function() {
        this.width = this.profileInfo.width;
        this.callParent();
    }
});