/**
 * Demonstrates a very simple tab panel with 3 tabs
 */
Ext.define('KitchenSink.view.Tabs', {
    extend: 'Ext.tab.Panel',

    config: {
        tabBar: {
            layout: {
                pack: Ext.filterPlatform('ie10') ? 'start' : 'center'
            }
        },
        activeTab: 1,
        defaults: {
            scrollable: true
        },
        items: [
            {
                title: 'Tab 1',
                html : 'By default, tabs are aligned to the top of a view.',
                cls: 'card',
                iconCls: Ext.theme.is.Blackberry || Ext.theme.is.Tizen ? 'home' : null
            },
            {
                title: 'Tab 2',
                html : 'A TabPanel can use different animations by setting <code>layout.animation.</code>',
                cls: 'card',
                iconCls: Ext.theme.is.Blackberry|| Ext.theme.is.Tizen ? 'organize' : null
            },
            {
                title: 'Tab 3',
                html : '<span class="action">User tapped Tab 3</span>',
                cls: 'card',
                iconCls: Ext.theme.is.Blackberry || Ext.theme.is.Tizen ? 'favorites' : null
            }
        ]
    }
});
