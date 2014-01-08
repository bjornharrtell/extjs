Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');

Ext.require([
    'Ext.tab.*',
    'Ext.ux.TabCloseMenu'
]);

Ext.onReady(function() {
    var currentItem;

    var tabs = Ext.widget('tabpanel', {
        renderTo: 'tabs',
        resizeTabs: true,
        enableTabScroll: true,
        width: 600,
        height: 250,
        defaults: {
            autoScroll: true,
            bodyPadding: 10
        },
        items: [{
            title: 'Tab 1',
            iconCls: 'tabs',
            html: 'Tab Body<br/><br/>' + Ext.example.bogusMarkup,
            closable: true
        }],
        plugins: Ext.create('Ext.ux.TabCloseMenu', {
            extraItemsTail: [
                '-',
                {
                    text: 'Closable',
                    checked: true,
                    hideOnClick: true,
                    handler: function (item) {
                        currentItem.tab.setClosable(item.checked);
                    }
                },
                '-',
                {
                    text: 'Enabled',
                    checked: true,
                    hideOnClick: true,
                    handler: function(item) {
                        currentItem.tab.setDisabled(!item.checked);
                    }
                }
            ],
            listeners: {
                beforemenu: function (menu, item) {
                    var enabled = menu.child('[text="Enabled"]'); 
                    menu.child('[text="Closable"]').setChecked(item.closable);
                    if (item.tab.active) {
                        enabled.disable();
                    } else {
                        enabled.enable();
                        enabled.setChecked(!item.tab.isDisabled());
                    }

                    currentItem = item;
                }
            }
        })
    });

    // tab generation code
    var index = 0;

    while(index < 3) {
        addTab(index % 2);
    }
    
    function doScroll(item) {
        var id = item.id.replace('_menu', ''),
            tab = tabs.getComponent(id).tab;
       
        tabs.getTabBar().layout.overflowHandler.scrollToItem(tab);
    }

    function addTab (closable) {
        ++index;
        tabs.add({
            closable: !!closable,
            html: 'Tab Body ' + index + '<br/><br/>' + Ext.example.bogusMarkup,
            iconCls: 'tabs',
            title: 'New Tab ' + index
        }).show();
    }
    
    function addToMenu(ct, tab) {
        menu.add({
           text: tab.title,
           id: tab.id + '_menu',
           handler: doScroll
       });
    }
    
    function removeFromMenu(ct, tab) {
        var id = tab.id + '_menu';
        menu.remove(id);
    }
    
    tabs.on({
        add: addToMenu,
        remove: removeFromMenu
    });

    Ext.widget('button', {
        iconCls: 'new-tab',
        renderTo: 'addButtonCt',
        text: 'Add Closable Tab',
        handler: function () {
            addTab(true);
        }
    });

    Ext.widget('button', {
        iconCls:'new-tab',
        renderTo: 'addButtonCt',
        style: 'margin-left: 8px;',
        text: 'Add Unclosable Tab',
        handler: function () {
            addTab(false);
        }
    });
    
    var menu = new Ext.menu.Menu();
    tabs.items.each(function(tab){
        addToMenu(tabs, tab);
    });
    Ext.widget('button', {
        iconCls: 'scroll',
        renderTo: 'addButtonCt',
        style: 'margin-left: 8px;',
        text: 'Scroll to:',
        menu: menu
    })
});
