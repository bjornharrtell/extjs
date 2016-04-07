/**
 * Demonstrates several options available when using Toolbars
 */
Ext.define('KitchenSink.view.Toolbars', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.SegmentedButton'
    ],

    config: {
        cls: 'card',
        html: 'Toolbars automatically come with <code>light</code> and <code>dark</code> UIs, but you can also make your own with Sass.',

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                scrollable: {
                    y: false,
                    indicators: false
                },
                items: [
                    {
                        text: 'Back',
                        ui: 'back',
                        hidden: (Ext.theme.name == "Blackberry") ? true : false
                    },
                    {
                        text: 'Default',
                        badgeText: '2',
                        hidden: (Ext.theme.name == "Blackberry") ? true : false
                    },
                    {
                        text: 'Round',
                        ui: 'round',
                        hidden: (Ext.theme.name == "Blackberry") ? true : false
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
                            },
                            {
                                text: 'Option 3'
                            }
                        ]
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: 'Action',
                        ui: 'action',
                        hidden: (Ext.theme.name == "Blackberry") ? true : false
                    },
                    {
                        text: 'Forward',
                        ui: 'forward',
                        hidden: (Ext.theme.name == "Blackberry") ? true : false
                    }
                ]
            }
        ]
    },

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
