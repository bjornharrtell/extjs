Ext.define('KitchenSink.view.desktop.TouchEvents', {
    extend: 'KitchenSink.view.TouchEvents',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            docked: 'left',
            width: '50%',
            id: 'touchinfopanel',

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [
                {
                    flex: 3,
                    scrollable: true,

                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    items: {
                        xtype: 'toucheventinfo'
                    }
                },
                {
                    xtype: 'toucheventlogger',
                    flex: 2
                }
            ]
        },
        {
            xtype: 'toucheventpad',
            flex: 1
        }
    ]
});
