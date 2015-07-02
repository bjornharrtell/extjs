Ext.define('KitchenSink.view.grid.ExpanderLockable', {
    extend: 'Ext.grid.Panel',

    xtype: 'expander-lockable',
    store: 'Companies',

    columns: [
        {text: "Company", flex: 1, dataIndex: 'name'},
        {text: "Price", formatter: 'usMoney', dataIndex: 'price'},
        {text: "Change", dataIndex: 'change'},
        {text: "% Change", dataIndex: 'pctChange'},
        {text: "Last Updated", width: 120, formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
    ],
    columnLines: true,
    enableLocking: true,
    height: 300,
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<p><b>Company:</b> {company}</p>',
            '<p><b>Change:</b> {change:this.formatChange}</p><br>',
            '<p><b>Summary:</b> {desc}</p>',
        {
            formatChange: function(v){
                var color = v >= 0 ? 'green' : 'red';
                return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
            }
        })
    }],
    collapsible: true,
    animCollapse: false,
    title: 'Expander Rows in a Collapsible Grid with lockable columns',
    //<example>
    exampleTitle: 'Expander Rows in a Collapsible Grid with lockable columns',
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