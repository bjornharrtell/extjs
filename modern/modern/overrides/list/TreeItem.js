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

        me.floater = floater = new Ext.Container({
            cls: cls + ' ' + Ext.baseCSSPrefix + 'treelist-floater',
            width: 200,
            top: 0,
            listeners: {
                element: 'element',
                click: function (e) {
                    return owner.onClick(e);
                }
            }
        });

        Ext.Viewport.add(floater);
        floater.add(me);
        floater.alignTo(me.getToolElement(), 'tl-tr');

        return floater;
    },

    runAnimation: function(animation) {
        return this.itemContainer.animate(animation);
    },

    stopAnimation: function(animation) {
        animation.end();
    }
});
