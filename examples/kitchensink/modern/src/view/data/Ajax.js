/**
 * Demonstrates loading data over AJAX.
 */
Ext.define('KitchenSink.view.data.Ajax', {
    extend: 'Ext.Container',

    scrollable: true,
    cls: 'demo-solid-background',
    shadow: true,
    formatJson: false,
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
                        var panel = Ext.getCmp('Ajax'),
                            container = panel.up('container');

                        panel.getParent().setMasked({
                            xtype: 'loadmask',
                            message: 'Loading...'
                        });

                        Ext.Ajax.request({
                            url: 'data/test.json',
                            success: function(response) {
                                container.renderJson(response.responseText);
                                //panel.setHtml('<pre>' + response.responseText + '</pre>');
                                panel.getParent().unmask();
                            }
                        });
                    }
                },
                {
                    text: 'Format JSON',
                    enableToggle: true,
                    handler: function(button) {
                        var panel = Ext.getCmp('Ajax'),
                            container = panel.up('container');

                        container.formatJson = button.isPressed();
                        container.renderJson();
                    }
                }
            ]
        }
    ],
    renderJson: function(json) {
        var panel = Ext.getCmp('Ajax'),
            container = panel.up('container');

        json = json || container.json;

        container.json = json;

        if (container.formatJson) {
            panel.setHtml('<pre>' + json + '</pre>');
        }
        else {
            panel.setHtml(json);
        }
    }
});
