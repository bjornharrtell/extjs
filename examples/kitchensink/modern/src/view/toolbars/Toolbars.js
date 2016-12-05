/**
 * Demonstrates several options available when using Toolbars
 */
Ext.define('KitchenSink.view.toolbars.Toolbars', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.SegmentedButton'
    ],

    cls: 'card',

    shadow: true,

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            scrollable: {
                y: false
            },
            items: [
                {
                    text: 'Default',
                    badgeText: '2'
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'segmentedbutton',
                    allowDepress: true,
                    items: [
                        {
                            text: 'Option 1',
                            pressed: true
                        },
                        {
                            text: 'Option 2'
                        }
                    ]
                },
                {
                    xtype: 'spacer'
                },
                {
                    text: 'Action',
                    ui: 'action'
                }
            ]
        }
    ],

    // @private
    constructor: function() {
        this.on({
            scope: this,
            delegate: 'button',

            tap: 'tapHandler'
        });

        this.callParent(arguments);
    },

    /**
     * Called when any button in these view is tapped
     */
    tapHandler: function(button) {
        this.setHtml("<span class=action>User tapped " + button.getText() + "</span>");
    }
});
