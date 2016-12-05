Ext.define('KitchenSink.view.tree.TreeListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tree-list',

    onToggleConfig: function (menuitem) {
        var treelist = this.lookupReference('treelist');

        treelist.setConfig(menuitem.config, menuitem.checked);
    },

    onToggleMicro: function (button, pressed) {
        var treelist = this.lookupReference('treelist'),
            navBtn = this.lookupReference('navBtn'),
            ct = treelist.ownerCt;

        treelist.setMicro(pressed);

        if (pressed) {
            navBtn.setPressed(true);
            navBtn.disable();
            this.oldWidth = ct.width;
            ct.setWidth(44);
        } else {
            ct.setWidth(this.oldWidth);
            navBtn.enable();
        }

        // IE8 has an odd bug with handling font icons in pseudo elements;
        // it will render the icon once and not update it when something
        // like text color is changed via style addition or removal.
        // We have to force icon repaint by adding a style with forced empty
        // pseudo element content, (x-sync-repaint) and removing it back to work
        // around this issue.
        // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
        // and this: https://github.com/twbs/bootstrap/issues/13863
        if (Ext.isIE8) {
            this.repaintList(treelist, pressed);
        }
    },

    onToggleNav: function (button, pressed) {
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
        treelist.setHighlightPath(pressed);
        ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');
        
        if (Ext.isIE8) {
            this.repaintList(treelist);
        }
    },
    
    repaintList: function(treelist, microMode) {
        treelist.getStore().getRoot().cascade(function(node) {
            var item, toolElement;
            
            item = treelist.getItem(node);
            
            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();
                    
                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    }
});
