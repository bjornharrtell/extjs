Ext.define('KitchenSink.view.grid.RowExpander', {
    extend: 'Ext.grid.Panel',

    xtype: 'row-expander-grid',
    store: 'Companies',

    columns: [
        {text: "Company", flex: 1, dataIndex: 'company'},
        {text: "Price", renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
        {text: "Change", dataIndex: 'change'},
        {text: "% Change", dataIndex: 'pctChange'},
        {text: "Last Updated", renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
    ],
    width: 600,
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
    title: 'Expander Rows in a Collapsible Grid',
    iconCls: 'icon-grid'
});
