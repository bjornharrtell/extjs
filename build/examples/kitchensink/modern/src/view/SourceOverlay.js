/**
 * This is used to display the source code for any given example. Each example has a 'Source' button
 * on its top toolbar that activates this
 */
Ext.define('KitchenSink.view.SourceOverlay', {
    extend: 'Ext.Container',
    xtype: 'sourceoverlay',

    config: {
        fixed: null,
        out: null
    },

    referenceHolder: true,
    layout: 'fit',

    items: [{
        xtype: 'tabpanel',
        defaultType: 'sourceitem',
        reference: 'tabs',

        items: [{
            xtype: 'titlebar',
            title: 'Details',
            docked: 'top',
            ui: 'neutral',
            align: 'right',

            style: 'z-index: 2',
            shadow: Ext.theme.name !== 'Triton',
            minHeight: Ext.theme.name === 'Triton' ? 44 : undefined,
            items: Ext.os.is.Phone ? {
                type: 'button',
                ui: 'action',
                iconCls: 'x-fa fa-close',
                align: 'right',
                action: 'closeSource'
            } : []
        }]
    }],

    captureSize: function () {
        var el = this.el;

        return (this.oldSize = {
            width: el.getWidth(),
            height: el.getHeight()
        });
    },

    setContent: function (content) {
        var tabs = this.lookup('tabs');

        tabs.removeAll();
        tabs.add(content);
        tabs.getTabBar().setHidden(content.length === 1);
    },

    updateOut: function (out) {
        var me = this,
            el = me.el,
            dom = el.dom,
            right;

        if (me.getHidden()) {
            if (out) {
                return;
            }
            me.show();
        }

        if (out) {
            me.setFixed(true);
            right = -me.oldSize.width;
        } 
        else {
            el.removeCls('sourceoverlay-transition');
            me.setFixed(true);

            me.setRight(-me.oldSize.width);
            right = 0;
        }

        el.addCls('sourceoverlay-transition');
        Ext.defer(function () {
            dom.style.right = right + 'px';
        }, 10);

        el.on({
            transitionend: function () {
                if (!out) {
                    me.setFixed(false);
                }
            },
            single: true,
            translate: false,
            delegate: false
        });
    },

    updateFixed: function (fixed) {
        var me = this,
            tabs = me.lookup('tabs'),
            size;

        if (fixed) {
            size = me.captureSize();

            me.setRight(0);
            me.setTop(0);
            me.setWidth(size.width);
            me.setHeight(size.height);
        } else {
            me.setWidth(null);
            me.setHeight(null);
            me.setRight(null);
            me.setTop(null);
        }
    }
});
