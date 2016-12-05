Ext.define('KitchenSink.view.grid.TreeListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tree-list',

    onMicroPressedChange: function(button, pressed) {
        var treelist = this.lookupReference('treelist'),
            navBtn = this.lookupReference('navBtn');

        treelist.setMicro(pressed);

        if (pressed) {
            navBtn.setPressed(true);
            navBtn.disable();
            this.oldWidth = treelist.getWidth();
            treelist.setWidth(this.measureWidth(treelist));
        } else {
            treelist.setWidth(this.oldWidth);
            navBtn.enable();
        }
    },

    onNavPressedChange: function(button, pressed) {
        var treelist = this.lookupReference('treelist');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
    },

    measureWidth: function(treelist) {
        return treelist.toolsElement.getWidth();
    }
});
