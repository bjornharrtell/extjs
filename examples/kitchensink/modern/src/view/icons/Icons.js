/**
 * Demonstrates some of the many icons availble via the framework
 */
Ext.define('KitchenSink.view.icons.Icons', {
    extend: 'Ext.tab.Panel',

    shadow: true,
    cls: 'demo-solid-background',
    activeTab: 0,
    layout: {
        animation: {
            type: 'slide',
            duration: 250
        }
    },
    tabBar: {
        layout: {
            pack : 'center',
            align: 'center'
        },
        docked: 'bottom',
        scrollable: null
    },
    defaults: {
        scrollable: true
    },
    items: [
        {
            iconCls: 'x-fa fa-info-circle',
            title  : 'Info',
            cls    : 'card',
            html   : 'Tabs and Buttons can display any <a href="http://fortawesome.github.io/Font-Awesome/icons/">Font Awesome</a> icon using the <code>iconCls</code> config.'
        },
        {
            iconCls: 'x-fa fa-download',
            title  : 'Download',
            cls    : 'card',
            html   : '<span class="action">User tapped Download</span>'
        },
        {
            iconCls: 'x-fa fa-star',
            title  : 'Favorites',
            cls    : 'card',
            html   : '<span class="action">User tapped Favorites</span>',
            hidden: (Ext.filterPlatform('ie10') && Ext.os.is.Phone) ? true : false
        },
        {
            iconCls: 'x-fa fa-bookmark',
            title  : 'Bookmarks',
            cls    : 'card',
            html   : '<span class="action">User tapped Bookmarks</span>',
            hidden: (Ext.filterPlatform('ie10') && Ext.os.is.Phone) ? true : false
        },
        {
            iconCls: 'x-fa fa-ellipsis-h',
            title  : 'More',
            cls    : 'card',
            html   : '<span class="action">User tapped More</span>'
        },
        {
            xtype : 'toolbar',
            ui: 'neutral',
            docked: 'top',
            scrollable: null,
            defaults: {
                ui: 'plain toolbar'
            },
            items: [
                { iconCls: 'x-fa fa-check' },
                { iconCls: 'x-fa fa-plus' },
                { iconCls: 'x-fa fa-pencil-square-o' },
                { iconCls: 'x-fa fa-times' },
                { iconCls: 'x-fa fa-refresh' },
                { iconCls: 'x-fa fa-reply' }
            ],
            layout: {
                pack : (Ext.filterPlatform('ie10') && !Ext.os.is.Phone) ? 'start' : 'center',
                align: 'center'
            }
        }
    ]
});
