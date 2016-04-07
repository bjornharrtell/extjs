/**
 * Demonstrates loading data over AJAX.
 */
Ext.define('KitchenSink.view.Ajax', {
    extend: 'Ext.Container',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id: 'Ajax',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        text: 'Load using Ajax',
                        handler: function() {
                            var panel = Ext.getCmp('Ajax');

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });

                            Ext.Ajax.request({
                                url: 'data/test.json',
                                success: function(response) {
                                    panel.setHtml(response.responseText);
                                    panel.getParent().unmask();
                                }
                            });
                        }
                    }
                ]
            }
        ]
    }
});
