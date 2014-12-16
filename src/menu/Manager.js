/**
 * Provides a common registry groups of {@link Ext.menu.CheckItem}s.
 *
 * Since 5.1.0, this class no longer registers all menus in your applications.
 * To access all menus, use {@link Ext.ComponentQuery ComponentQuery}.
 * @singleton
 */
Ext.define('Ext.menu.Manager', {
    singleton: true,

    alternateClassName: 'Ext.menu.MenuMgr',

    uses: ['Ext.menu.Menu'],
    
    groups: {},

    /**
     * Hides all menus that are currently visible
     * @return {Boolean} success True if any active menus were hidden.
     */
    hideAll: function() {
        var allMenus = Ext.ComponentQuery.query('menu[floating]:not([hidden])'),
            len = allMenus.length,
            i,
            result = false;

        for (i = 0; i < len; i++) {
            allMenus[i].hide();
            result = true;
        }
        return result;
    },

    /**
     * Returns a {@link Ext.menu.Menu} object
     * @param {String/Object} menu The string menu id, an existing menu object reference, or a Menu config that will
     * be used to generate and return a new Menu this.
     * @param {Object} [config] A configuration to use when creating the menu.
     * @return {Ext.menu.Menu} The specified menu, or null if none are found
     */
    get: function(menu, config) {
        var result;
        
        if (typeof menu === 'string') { // menu id
            result = Ext.getCmp(menu);
            if (result instanceof Ext.menu.Menu) {
                menu = result;
            }
        } else if (Ext.isArray(menu)) { // array of menu items
            config = Ext.apply({items:menu}, config);
            menu = new Ext.menu.Menu(config);
        } else if (!menu.isComponent) { // otherwise, must be a config
            config = Ext.apply({}, menu, config);
            menu = Ext.ComponentManager.create(config, 'menu');
        }
        return menu;
    },

    // @private
    registerCheckable: function(menuItem) {
        var groups  = this.groups,
            groupId = menuItem.group;

        if (groupId) {
            if (!groups[groupId]) {
                groups[groupId] = [];
            }

            groups[groupId].push(menuItem);
        }
    },

    // @private
    unregisterCheckable: function(menuItem) {
        var groups  = this.groups,
            groupId = menuItem.group;

        if (groupId) {
            Ext.Array.remove(groups[groupId], menuItem);
        }
    },

    onCheckChange: function(menuItem, state) {
        var groups  = this.groups,
            groupId = menuItem.group,
            i       = 0,
            group, ln, curr;

        if (groupId && state) {
            group = groups[groupId];
            ln = group.length;
            for (; i < ln; i++) {
                curr = group[i];
                if (curr !== menuItem) {
                    curr.setChecked(false);
                }
            }
        }
    }
});