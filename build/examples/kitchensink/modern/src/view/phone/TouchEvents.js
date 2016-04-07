Ext.define('KitchenSink.view.phone.TouchEvents', {
    extend: 'KitchenSink.view.TouchEvents',

    config: {
        layout: 'card',

        items: [
            {
                scrollable: true,

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [
                    {
                        xtype: 'button',
                        ui: 'confirm',
                        text: 'Console',
                        margin: 10,
                        action: 'showConsole'
                    },
                    {
                        xtype: 'toucheventinfo'
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'toucheventpad',
                        flex: 1
                    },
                    {
                        xtype: 'toucheventlogger',
                        flex: 1
                    }
                ]
            }
        ]
    },

    showConsole: function() {
        this.setActiveItem(1);
    }
});