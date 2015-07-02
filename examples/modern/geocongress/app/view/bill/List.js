/**
 * A list of Bills
 */
Ext.define('GeoCon.view.bill.List', {
    extend: 'Ext.dataview.List',

    id: 'billList',

    config: {
        store: 'Bills',
        variableHeights: true,
        useSimpleItems: true,
        itemTpl: Ext.create('Ext.XTemplate', '<div class="bill">({bill_id}) {short_title}</div>')
    }
});
