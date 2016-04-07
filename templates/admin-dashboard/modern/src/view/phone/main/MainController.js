/**
 * This view controller extends the MainController for the phone profile. The main
 * difference is that the navigation tree (and the logo) are removed from the main
 * view and floated out on demand.
 */
Ext.define('Admin.view.phone.main.MainController', {
    extend: 'Admin.view.main.MainController',
    alias: 'controller.phone-main',

    slidOutCls: 'main-nav-slid-out',

    showNavigation: false,

    init: function (view) {
        var me = this,
            refs = me.getReferences(),
            logo = refs.logo,
            nav;

        me.callParent([ view ]);

        nav = me.nav;

        // Detach the navigation container so we can float it in from the edge.
        nav.getParent().remove(nav, false);
        nav.addCls(['x-floating', 'main-nav-floated', me.slidOutCls]);
        nav.setScrollable(true);
        nav.getRefOwner = function () {
            // we still need events to route here or our base
            return view;
        };

        // Also, transplant the logo from the toolbar to be docked at the top of the
        // floating nav.
        nav.add(logo);
        logo.setDocked('top');

        Ext.getBody().appendChild(nav.element);
    },

    onNavigationItemClick: function (tree, info) {
        if (info.select) {
            // If we click a selectable node, slide out the navigation tree. We cannot
            // use select event for this since the user may tap the currently selected
            // node. We don't want to slide out, however, if the tap is on an unselectable
            // thing (such as a parent node).
            this.setShowNavigation(false);
        }
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        this.setShowNavigation(false);

        this.callParent(arguments);
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        // Ignore the first update since our initial state is managed specially. This
        // logic depends on view state that must be fully setup before we can toggle
        // things.
        //
        // NOTE: We do not callParent here; we replace its logic since we took over
        // the navigation container.
        //
        if (oldValue !== undefined) {
            var me = this,
                nav = me.nav,
                mask = me.mask;

            if (showNavigation) {
                me.mask = mask = Ext.Viewport.add({
                    xtype: 'loadmask',
                    userCls: 'main-nav-mask'
                });

                mask.element.on({
                    tap: me.onToggleNavigationSize,
                    scope: me,
                    single: true
                });
            } else if (mask) {
                mask.destroy();
                me.mask = null;
            }

            nav.toggleCls(me.slidOutCls, !showNavigation);
        }
    }
});
