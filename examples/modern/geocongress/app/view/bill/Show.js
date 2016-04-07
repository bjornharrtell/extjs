/**
 * A summary of a Bill
 */
Ext.define('GeoCon.view.bill.Show', {
    extend: 'Ext.Container',

    id: 'billSummary',

    config: {

        scrollable: 'vertical',

        items: [
            {
                id: 'billSummaryToolbar',
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text: 'Back',
                        ui: 'back',
                        id: 'billSummaryBackButton'
                    }
                ]
            }
        ],
        tpl: Ext.create('Ext.XTemplate',
                '<p><strong>Official Title:</strong> {official_title}</p><br>',
                '<p><strong>Official Summary:</strong> {[this.notAvailable(values.summary)]}</p>',
            {
                notAvailable: function(value) {
                    return value ? value : 'Not Available';
                }
            }
        )
    }
});
