/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('KitchenSink.view.BottomTabs', {
    extend: 'Ext.tab.Panel',

    config: {
        activeTab: 0,
        tabBar: {
            platformConfig: {
                blackberry: {
                    ui: 'dark'
                }
            },
            layout: {
                pack : 'center',
                align: 'center'
            },
            docked: 'bottom',
            defaults: {
                iconAlign: 'top'
            }
        },
        defaults: {
            scrollable: true
        },
        items: [
            {
                title: 'About',
                html: '<p>Docking tabs to the bottom will automatically change their style.</p>',
                cls: 'card',
                iconCls: 'x-fa fa-info-circle'
            },
            {
                title: 'Favorites',
                html: 'Badges <em>(like the 4, below)</em> can be added by setting <code>badgeText</code> when creating a tab or by using <code>setBadgeText()</code> on the tab later.',
                cls: 'card',
                iconCls: 'x-fa fa-star',
                badgeText: '4'
            },
            {
                title: 'Downloads',
                id: 'tab3',
                html: 'Badge labels will truncate if the text is wider than the tab.',
                badgeText: 'Overflow test',
                cls: 'card',
                iconCls: 'x-fa fa-download',
                hidden: (Ext.filterPlatform('ie10') && Ext.os.is.Phone) ? true : false
            },
            {
                title: 'Settings',
                html: 'Tabbars are <code>ui:"dark"</code> by default, but also have light variants.',
                cls: 'card',
                iconCls: 'x-fa fa-gear',
                hidden: (Ext.filterPlatform('ie10') && Ext.os.is.Phone) ? true : false
            },
            {
                title: 'User',
                html: '<span class="action">User tapped User</span>',
                cls: 'card',
                iconCls: 'x-fa fa-user'
            }
        ]
    }
});
