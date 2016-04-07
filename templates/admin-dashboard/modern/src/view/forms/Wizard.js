/**
 * This class is a simple Back/Next style wizard extension of a tab panel.
 */
Ext.define('Admin.view.forms.Wizard', {
    extend: 'Ext.tab.Panel',
    xtype: 'wizard',

    isWizard: true,

    config: {
        appendButtons: true,

        controlBar: {
            xtype: 'toolbar',
            docked: 'bottom',
            border: false,
            items: [
                '->'
            ]
        },

        next: {
            xtype: 'button',
            ui: 'action',
            text: 'Next',
            margin: '0 8 0 8',
            itemId: 'next'
        },

        back: {
            xtype: 'button',
            ui: 'action',
            text: 'Back',
            margin: '0 0 0 8',
            itemId: 'back'
        }
    },

    cls: 'wizard',

    initialize: function () {
        var me = this,
            back, next, items, toolbar;

        me.callParent();

        toolbar = Ext.clone(me.getControlBar());
        items = toolbar.items || (toolbar.items = []);
        next = me.getNext();
        back = me.getBack();

        if (me.getAppendButtons()) {
            items.push(back, next);
        } else {
            items.unshift(back, next);
        }

        toolbar = me.add(toolbar);

        me.nextBtn = next = toolbar.getComponent('next');
        me.backBtn = back = toolbar.getComponent('back');

        next.on({
            tap: me.onNext,
            scope: me
        });

        back.on({
            tap: me.onBack,
            scope: me
        });

        this.syncBackNext();
    },

    onBack: function () {
        var index = this.getItemIndex();

        if (index > 0) {
            this.setActiveItem(index - 1);
        }
    },

    // We look at the tabBar since it presents tabs for the items we want to navigate
    // vs "this.getItem()" which would include the tabBar and the navigation toolbar
    // we've added

    onNext: function () {
        var me = this,
            index = me.getItemIndex(),
            count = me.getTabBar().getItems().length;

        if (index < count - 1) {
            me.allowNext = true;
            me.setActiveItem(index + 1);
            me.allowNext = false;
        }
    },

    getItemIndex: function (item) {
        var tabBar = this.getTabBar(),
            tabs = tabBar.getItems();

        item = item || this.getActiveItem();

        return tabs.indexOf(item.tab);
    },

    syncBackNext: function () {
        var me = this,
            next = me.nextBtn,
            back = me.backBtn,
            i, index, items, tab, tabBar;

        if (next && back) {
            index = me.getItemIndex();
            tabBar = me.getTabBar();
            items = tabBar.getItems();

            back.setDisabled(!index);
            next.setDisabled(index >= items.length - 1);

            // Disable all tabs beyond the current (progress must use Next button):
            //
            for (i = items.length; i-- > 0; ) {
                tab = items.getAt(i);
                tab.setDisabled(i > index);
            }
        }
    },

    updateActiveItem: function () {
        this.callParent(arguments);

        this.syncBackNext();
    }
});
