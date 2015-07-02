Ext.define('Ext.overrides.list.TreeItem', {
    override: 'Ext.list.TreeItem',

    createFloater: function () {
        var me = this,
            owner = me.getOwner(),
            ui = owner.getUi(),
            cls = Ext.baseCSSPrefix + 'treelist',
            floater;

        if (ui) {
            cls += ' ' + cls + '-' + ui;
        }

        me.floater = floater = new Ext.container.Container({
            cls: cls + ' ' + Ext.baseCSSPrefix + 'treelist-floater',
            floating: true,
            width: 200,
            shadow: false,
            renderTo: Ext.getBody(),
            listeners: {
                element: 'el',
                click: function (e) {
                    return owner.onClick(e);
                }
            }
        });

        floater.add(me);
        floater.el.alignTo(me.getToolElement(), 'tr?');

        return floater;
    },

    runAnimation: function(animation) {
        return this.itemContainer.addAnimation(animation);
    },

    stopAnimation: function(animation) {
        animation.jumpToEnd();
    }
});
