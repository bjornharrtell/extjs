Ext.define('KitchenSink.view.grid.TreeListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tree-list',

    onModeToggle: function(segmented, button, pressed) {
        if (button.getReference() === 'navBtn') {
            this.onToggleNav(pressed);
        } else {
            this.onToggleMicro(segmented, pressed);
        }
    },

    onToggleConfig: function(menuitem) {
        var treelist = this.lookupReference('treelist');

        treelist.setConfig(menuitem.config, menuitem.checked);
    },

    onToggleMicro: function(segmented, pressed) {
        var treelist = this.lookupReference('treelist'),
            navBtn = this.lookupReference('navBtn');

        treelist.setMicro(pressed);

        if (pressed) {
            segmented.setPressed(navBtn, true);
            navBtn.disable();
            this.oldWidth = treelist.getWidth();
            treelist.setWidth(44);
        } else {
            treelist.setWidth(this.oldWidth);
            navBtn.enable();
        }
    },

    onToggleNav: function(pressed) {
        var treelist = this.lookupReference('treelist');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
    }
});